import fileSystem from "fs";

/**
 * Handles the data given by gitlab API
 *
 * @param {String} url used to get the project data. Used for console output
 * @param {String} filePath relative file path to save data
 * @param {Array.<Object>} projects array provided from gitlab
 */
export function handleProjectData(url, filePath, projects) {
    console.log(`-URL:${url}`);
    console.log('-Project count', projects.length);

    if (projects.length > 0) {

        //Save to file for debug/review of model
        writeProjectData(filePath, projects);

        //Process data
        listProjects(projects)
    }
}

function listProjects(projects) {
    console.log('\nProjects by path:')
    projects.forEach(projectData => {
        console.log('\t' + projectData.path_with_namespace);
    });
}

function writeProjectData(path, projects) {
    fileSystem.writeFileSync(path, JSON.stringify(projects, null, 4));
}