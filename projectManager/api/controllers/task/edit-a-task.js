module.exports = {


  friendlyName: 'Edit a single task',


  description: 'Display "edit task page" with all the relevant data for that project already filled in',

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something went wrong~ please try again!'
    },

    success: {
      viewTemplatePath: 'pages/task/edit-task'
    },

  },


  fn: async function (inputs, exits) {

    // if the action recieves a GET request then show the user an EDIT information
      let { id } = this.req.params

      //get the specific task
      let task = await Task.find({
        where: { 'id' : id }
      })
      .populate('assignedTo')
      .populate('project')

      task= task[0]


      // NOTE:
      // because it's a many to one association
      // .populate() can only be called on the MANY side of the association
      // SO. That means I need to populate task.project manually as I'm doing below
      // task.project = await Project.find(task.id)
      // .intercept((err)=>{
      //    err.message = 'Uh oh: '+err.message;
      //    return err;
      // })

      // get project data
      let projects = await Project.find({
        status: {'!=':'archived'}
      })
      .populate('managedBy')
      .intercept((err)=>{
         err.message = 'Uh oh: '+err.message;
         return err;
      })


      // get developers data
      let developers = await User.find({
        status: {'!=':'archived'}
      })
      .intercept((err)=>{
         err.message = 'Uh oh: '+err.message;
         return err;
      })

      sails.log({
        developers: developers,
        projects: projects,
        task: task,
      })
      sails.log('task --> project ',task)

      // Respond with view.
      return exits.success({
        developers: developers,
        projects: projects,
        task: task,
      })


    }
}
