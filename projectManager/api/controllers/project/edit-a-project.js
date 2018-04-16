module.exports = {


  friendlyName: 'View projects',


  description: 'Display "edit project page" with all the relevant data for that project already filled in',

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something went wrong~ please try again!'
    },

    success: {
      viewTemplatePath: 'pages/project/edit-project'
    },

  },


  fn: async function (inputs, exits) {

    // if the action recieves a GET request then show the user an EDIT information
      let { id } = this.req.params

      // get managers
      let managers = await User.find({
        where: {isManager: 1}
      })
      .intercept((err)=>{
         err.message = 'Uh oh: '+err.message;
         return err;
      })

      // get Project
      let project = await Project.find(id)
      .populate('managedBy')
      // .populate('developers')
      // .populate('tasks')
      .intercept((err)=>{
         err.message = 'Uh oh: '+err.message;
         return err;
      })

      sails.log(project)

      // Respond with view.
      return exits.success({
        managers: managers,
        project: project[0],
      })


    }
}
