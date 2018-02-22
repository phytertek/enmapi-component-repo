const { Types } = require('enmapi/database/utils');

module.exports = {
  Component: {
    Schema: {
      name: {
        type: String,
        required: true,
        unique: true
      },
      gh_url: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String
      },
      installMessage: {
        type: String
      },
      author: {
        type: String
      },
      version: {
        type: String,
        default: '0.1.0'
      },
      files: {
        type: String
      },
      dependencies: {
        type: String
      }
    }
  }
};
