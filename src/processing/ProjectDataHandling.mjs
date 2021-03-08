import fileSystem from "fs";

/**
 * Handles the data given by gitlab API
 *
 * @param {GitlabGroup} group data for logging
 * @param {String} url used to get the project data. Used for console output
 * @param {String} jsonFilePath relative file path to save data
 * @param {String} markdownFilePath relative file path to save markdown output
 * @param {Array.<GitlabProject>} projects array provided from gitlab
 */
export function handleProjectData(group, url, jsonFilePath,markdownFilePath, projects) {
    console.log('\nGroup:' + group.full_name);
    console.log('-Web:' + group.web_url);
    console.log(`-Call:${url}`);
    console.log('-Project count', projects.length);

    if (projects.length > 0) {

        //Save to file for debug/review of model
        writeProjectData(jsonFilePath, projects);

        //Process data
        listProjects(projects)

        //Generate badges
        generateBadges(markdownFilePath, projects);
    }
}

/**
 * Outputs a list of projects to console
 *
 * @param {Array.<GitlabProject>} projects to list
 */
function listProjects(projects) {
    console.log('-Projects by path:')
    projects.forEach(projectData => {
        console.log('\t' + projectData.path_with_namespace);
    });
}

/**
 * Writes the list of projects to console
 *
 * @param {String} path to write towards
 * @param {Array.<GitlabProject>} projects to write
 */
function writeProjectData(path, projects) {
    fileSystem.writeFileSync(path, JSON.stringify(projects, null, 4));
}

/**
 * @param {String} filePath
 * @param {Array.<GitlabProject>} projects
 */
function generateBadges(filePath, projects) {

}