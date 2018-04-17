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
      status: {'!=':'archived'}
    })
    .populate('project')
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    // // define statuses
    // let tasksByStatus =  {
    //   'archived': [],
    //   'backlog': [],
    //   'active': [],
    //   'work in progress': [],
    //   'pending review': [],
    //   'reviewed': [],
    //   'pending UAT': [],
    //   'UAT passed': [],
    //   'pending deployment': [],
    //   'done': [],
    // }
    //
    // // for each task --> loop through tasks, seperate into sections.
    // tasks.forEach( task => {
    //   switch(task.status) {
    //     case 'archived': {
    //       tasksByStatus['archived'].push(task)
    //       break;
    //     }
    //     case 'backlog': {
    //       asksByStatus['backlog'].push(task)
    //       break;
    //     }
    //     case 'active': {
    //       asksByStatus['active'].push(task)
    //       break;
    //     }
    //     case 'work in progress': {
    //       asksByStatus['work in progress'].push(task)
    //       break;
    //     }
    //     case 'pending review': {
    //       asksByStatus['pending review'].push(task)
    //       break;
    //     }
    //     case 'reviewed': {
    //       asksByStatus['reviewed'].push(task)
    //       break;
    //     }
    //     case 'pending UAT': {
    //       asksByStatus['pending UAT'].push(task)
    //       break;
    //     }
    //     case 'UAT passed': {
    //       asksByStatus['UAT passed'].push(task)
    //       break;
    //     }
    //     case 'pending deployment': {
    //       asksByStatus['pending deployment'].push(task)
    //       break;
    //     }
    //     case 'done': {
    //       asksByStatus['done'].push(task)
    //       break;
    //     }
    //   }
    // })
    console.log(tasks)

    // Respond with view.
    return exits.success({
      // tasks: tasksByStatus,
      tasks: tasks,
      developers: developers,
      projects: projects,
    });

  }


};
