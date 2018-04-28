module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/developer/view-developers'
    }

  },


  fn: async function (inputs, exits) {

    // get developers
    let developers = await User.find({
      status: { '!=' : ['Archived'] }
    })
    // .populate('tasks')

    // for each developer, look at tasks and find out :
    // -- how many hours they worked,
    // -- how many overtime hours they worked
    // ---- add both to make total hours

    // loop through it again to find total contribution in %


    sails.log('The devs are:', developers)
    // Respond with view.
    return exits.success({
      developers: developers,
    });

  }


};
