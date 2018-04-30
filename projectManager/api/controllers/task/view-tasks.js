module.exports = {


  friendlyName: 'View Tasks',


  description: 'Display "Tasks" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/task/view-tasks'
    }

  },


  fn: async function (inputs, exits) {

    // get project data
    let projects = await Project.find({
      status: {'!=':'archived'}
    })
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

    // get the task data
    let tasks = await Task.find({
      status: {'!=':'archived'},
      assignedTo: this.req.session.userId
    })
    .populate('project')
    .intercept((err)=>{
      err.message = 'Uh oh: '+err.message;
      return err;
    })

    console.log(tasks)

    // Respond with view.
    return exits.success({
      tasks: tasks,
      developers: developers,
      projects: projects,
    });

  }


};
