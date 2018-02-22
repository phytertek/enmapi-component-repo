const {
  getFindComponentByName,
  postPublishComponent,
  getGetComponentByName
} = require('./controllers');

module.exports = {
  '/component': {
    get: {
      '/find/:component_name': getFindComponentByName,
      '/get/:component_name': getGetComponentByName
    },
    post: {
      '/publish': postPublishComponent
    }
  }
};
