module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/project/view-projects'
    }

  },


  fn: function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
