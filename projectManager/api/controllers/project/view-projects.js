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


    // get managers
    let managers = await User.find({
      where: {isManager: 1}
    })
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    });

    sails.log('managers are :',managers)


    // get projects
    let projects = await Project.find({
      status: { '!=' : ['Archived'] }
    })
    .populate('managedBy')
    // .populate('developers')
    // .populate('tasks')
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    sails.log('projects are :',projects)


    // Respond with view.
    return exits.success({
      managers: managers,
      projects: projects,
    });

  }


};
