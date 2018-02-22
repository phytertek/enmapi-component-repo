const Component = require('enmapi/database').Component;
const { sendUserError } = require('enmapi/common/errors');
const {
  createRepoAndPush,
  createRepoWithCollaborator,
  pushFilesToRepo
} = require('enmapi/services').Github;

module.exports = {
  getFindComponentByName: async (req, res) => {
    try {
      const { component_name } = req.params;
      const component = await Component.findOne({ name: component_name });
      if (!component) res.json(false);
      else res.json(true);
    } catch (error) {
      sendUserError(error, res);
    }
  },
  postPublishComponent: async (req, res) => {
    try {
      const { name, files, description, author, dependencies } = req.body;
      const component = await new Component({
        name,
        description,
        author,
        dependencies: JSON.stringify(dependencies),
        files: JSON.stringify(files)
      });
      const newRepo = await createRepoAndPush(
        `api_comp_${name}`,
        author,
        files
      );
      component.gh_url = newRepo.data.html_url;
      await component.save();
      res.json(component);
    } catch (error) {
      sendUserError(error, res);
    }
  },
  getGetComponentByName: async (req, res) => {
    try {
      const { component_name } = req.params;
      const component = await Component.findOne({ name: component_name });
      res.json(component);
    } catch (error) {
      sendUserError(error, res);
    }
  }
};
