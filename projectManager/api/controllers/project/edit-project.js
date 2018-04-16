module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something went wrong~ please try again!'
    },

    success: {
      viewTemplatePath: 'pages/project/edit-project'
    }

  },


  fn: async function (inputs, exits) {

    let {params} = this.req
    sails.log(" FIND ME HERE ",params)
    if (this.req.method == 'GET') {

      // get managers
      let managers = await User.find({
        where: {isManager: 1}
      })
      .intercept((err)=>{
         err.message = 'Uh oh: '+err.message;
         return err;
      });

      // get managers
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


      // Respond with view.
      return exits.success({
        managers: managers,
        projects: projects,
      });

    } else if ( this.req.method == 'POST ') {

    }
  }


};
