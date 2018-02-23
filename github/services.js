const GitHubApi = require('github');
const fs = require('fs');
const spawn = require('child_process').spawn;
const cwd = process.cwd();
const env = process.env; //require('../env');

const createRepo = async name => {
  try {
    const github = new GitHubApi({ debug: true });
    const authenticated = await github.authenticate({
      type: 'token',
      token: env.GH_AUTH_TOKEN
    });
    const newRepo = await github.repos.create({ name });
    return newRepo;
  } catch (error) {
    throw new Error(error);
  }
};
const addRepoCollaborator = async (repo, username) => {
  try {
    const github = new GitHubApi({ debug: true });
    const authenticated = await github.authenticate({
      type: 'token',
      token: env.GH_AUTH_TOKEN
    });
    const newCollaborator = await github.repos.addCollaborator({
      owner: 'enmapi-am',
      repo,
      username
    });
    return newCollaborator;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const createRepoWithCollaborator = async (name, username) => {
  try {
    const newRepo = await createRepo(name);
    const addCollaborator = await addRepoCollaborator(name, username);
    return newRepo;
  } catch (error) {
    throw new Error(error);
  }
};
const pushFilesToRepo = (repo_name, files) => {
  fs.mkdirSync(`${cwd}/gitbin/${repo_name}`);
  const writeFiles = (path, files) => {
    console.log('Writing files', path);
    const filesList = Object.keys(files);
    filesList.forEach(name => {
      if (typeof files[name] === 'string') {
        fs.writeFileSync(`${path}/${name}`, files[name], 'utf8');
      } else if (typeof files[name] === 'object') {
        fs.mkdirSync(`${path}/${name}`);
        writeFiles(`${path}/${name}`, files[name]);
      }
    });
  };
  writeFiles(`${cwd}/gitbin/${repo_name}`, files);
  const git_init_commit = spawn(
    `cd ${cwd}/gitbin/${repo_name} && git init && git add . && git commit -m "Create repo commit"`,
    { shell: true }
  );
  git_init_commit.on('close', () => {
    const push_to_repo = spawn(
      `cd ${cwd}/gitbin/${repo_name} && git remote add origin https://${
        env.GH_UN
      }:${
        env.GH_PW
      }@github.com/enmapi-am/${repo_name}.git && git push origin master`,
      { shell: true }
    );
    push_to_repo.on('close', () => {
      const clean_up = spawn(`cd ${cwd}/gitbin && rm -rf ${repo_name}`, {
        shell: true
      });
    });
  });
  git_init_commit.stdout.on('data', data => console.log(data.toString()));
};

const createRepoAndPush = async (reponame, username, files) => {
  try {
    const repo = await createRepo(reponame);
    pushFilesToRepo(reponame, files);
    addRepoCollaborator(reponame, username);
    return repo;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = {
  createRepo,
  createRepoAndPush,
  createRepoWithCollaborator,
  pushFilesToRepo
};
