# Gitlab Group Badge Generator

Makes a series of API calls to gather all projects for a group and its subgroups. Then converst the json data to markdown badges for use in a group wiki page.

## How to use?

Invoke as a normal node file with the following args:

`--url <path_to_gitlab> --token <personal_access_token> --group <parent_group>`

## Gitlab data model

Parts of the models are document in the code. For complete documentation see: https://docs.gitlab.com/ee/api/api_resources.html

## Calls used

* Version - used to see if we are authenticated
* groups/:id/subgroups - gather all subgroups to get ids
* groups/:id/projects - gather all projects

## Limitations currently

As of writing this (March 8th, 2021) the program can only do 100 groups per group. This is due to paging limits of gitlab api and me being too lazy to work around it. Feel free to pull request a fix if you need it.

Additionally, you need authentication access via the access token to see groups and projects. This is not a limit of the application or API. However, will prevent generating all badges of a group if you don't have access.

## Why is this on github?

I use this code at work but developed it on my own outside normal projects. Since I don't have my own person gitlab i'm hosting this on github.
