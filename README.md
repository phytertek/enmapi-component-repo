# enmapi Component Repository Server

## Flow In

### 1. Component Submission via enmapi-component-uploader

* Current component name (name of directory) and desired component name (optional) is specified via the command line
* Component files are read to identify package dependencies
  * if local dependencies exist outside of the component root, throw error specifying the out-of-scope requirements
  * if package dependencies exist, package.json will be parsed for dependency versions
    * if no package.json or no dependency match, throw error specifing the package(s) no version is provided for
* A component json object is then created containing name of component, description, author, dependencies required, file names, and file contents
* json object is sent to the enmapi component repo api

### 2. Process submission, create and push new repo, save meta to db

* Asynchronous data submit to mongo and github

## Flow Out

### 1. Component Query via create-enmapi-app

*
