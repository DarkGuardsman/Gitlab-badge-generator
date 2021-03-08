/**
 * @typedef GitlabProject
 * @property {String} id
 * @property {String} name
 * @property {String} name_with_namespace
 * @property {String} path
 * @property {String} path_with_namespace - path used by the project
 * @property {String} created_at
 * @property {String} default_branch
 * @property {Array} tag_list
 * @property {String} ssh_url_to_repo
 * @property {String} http_url_to_repo
 * @property {String} web_url
 * @property {String} readme_url
 * @property {String} avatar_url
 * @property {Number} forks_count
 * @property {Number} star_count
 * @property {String} last_activity_at
 * @property {GitlabProjectNamespace} namespace
 * @property {Object} _links
 */

/**
 * @typedef GitlabProjectNamespace
 * @property {Number} id
 * @property {String} name
 * @property {String} path
 * @property {String} kind
 * @property {String} full_path
 * @property {Number} parent_id
 * @property {String} avatar_url
 * @property {String} web_url
 */