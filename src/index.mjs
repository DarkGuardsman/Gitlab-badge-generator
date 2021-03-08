import fileSystem from 'fs';
import minimist from 'minimist'
import lodash from 'lodash'
import {handleProjectData} from "./processing/ProjectDataHandling.mjs";
import jsonDataCall from "./calls/SimpleJsonData.mjs";
import {genericUrlError, removeTokenFromUrl} from "./Helpers.mjs";

const argv = minimist(process.argv.slice(2));

//Generate urls
const api_url = `${argv.url}/api/v4/`
const token = argv.token;
const group = argv.group;

const versions_url = `${api_url}version?private_token=${token}`;
const subgroups_url = `${api_url}groups/${group}/subgroups?private_token=${token}`;
const projects_url = `${api_url}groups/${group}/projects?private_token=${token}&per_page=100&order_by=created_at`; //Setting to max per page TODO loop all pages

//Create output folder
if (!fileSystem.existsSync('output')) { //TODO args for file path
    fileSystem.mkdirSync('output');
}

//Start API calls
jsonDataCall(versions_url,
    (json) => {
        console.log('Gitlab Version: ', json);

        //Call main projects endpoint
        jsonDataCall(projects_url,
            (projects) => {
                const groupData = {
                    web_url: lodash.first(projects).namespace.web_url,
                    full_name: lodash.first(projects).namespace.full_path
                };
                handleProjectData(groupData,
                    removeTokenFromUrl(projects_url, token),
                    'output/projects.json',//TODO args for file path
                    'output/projects.md',//TODO args for file path
                    projects);
            },
            (err) => genericUrlError(removeTokenFromUrl(versions_url, token), err)
        );

        //Handle subgroups for the main group
        jsonDataCall(subgroups_url,
            (sub_groups) => {
                sub_groups.forEach(group => {
                    const url = `${api_url}groups/${group.id}/projects?private_token=${token}&per_page=100&order_by=created_at`;
                    //Call main projects endpoint
                    jsonDataCall(url, (projects) => {
                            handleProjectData(group,
                                removeTokenFromUrl(url, token),
                                `output/projects-${group.path}.json`,//TODO args for file path
                                `output/projects-${group.path}.md`,//TODO args for file path
                                projects);
                        },
                        (err) => genericUrlError(removeTokenFromUrl(versions_url, token), err)
                    );
                })
            },
            (err) => genericUrlError(removeTokenFromUrl(versions_url, token), err)
        );
    },
    (err) => genericUrlError(removeTokenFromUrl(versions_url, token), err)
);




