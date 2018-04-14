module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/developer/view-developers'
    }

  },


  fn: function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
