// const ModelNameHere = require('enmapi/database').ModelNameHere
// const { sendUserError } = require('enmapi/common/errors')

module.exports = {
  postGithubWebhook: async (req, res) => {
    try {
      console.log('GITHUB WEBOOOK RECD', req.body);
      res.sendStatus(200);
    } catch (error) {
      sendUserError(error, res);
    }
  }
};
