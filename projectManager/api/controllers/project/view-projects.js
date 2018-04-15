module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something went wrong~ please try again!'
    },

    success: {
      viewTemplatePath: 'pages/project/view-projects'
    }

  },


  fn: async function (inputs, exits) {

    let managers = await User.find({
      where: {isManager: 1}
    })
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    });

    sails.log('managers are :',managers)
    // Respond with view.
    return exits.success({
      managers: managers,
    });

  }


};
