module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/task/view-my-tasks'
    }

  },


  fn: function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
