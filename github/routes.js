const { postGithubWebhook } = require('./controllers');
// const { authorizeRoute } = require('enmapi/services').Auth // Requires auth template component

module.exports = {
  '/gh': {
    // middleware: [authorizeRoute], // enables authorization on all routes
    // head: {
    //   '/sub-route-1': aControllerFunction
    // },
    get: {
      // '/cb': getGithubAuthCallback
    },
    post: {
      '/wh': postGithubWebhook
    },
    patch: {},
    delete: {}
  }
};
