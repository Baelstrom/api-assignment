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


    // get managers
    let projects = await Project.find({
      status: { '!=' : ['Archived'] }
    })
    .populate('managedBy')
    // .populate('developers')
    .populate('tasks')
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    sails.log('tasks are :',projects[0].tasks)

    // okay so now each project has tasks associated with it.

    // what makes the most sense to me is :
    // for each Developer assigned to a project
    // Task.find() where assignedTo = devID and project = projectID
    // let sum = 0; let overtime = 0; totalSum = 0;
    // for each in Tasks.
    // let startingValue = tasks[0].createdAt
    // trim starting value to be only date
    // foreach in tasks
    // trim comparing value to be only date
    // while today
    //

    /*

    let projectSummary = [
      {
        developerName: 'Susan',
        hoursWorked: 150,
        overtime: 12,
        totalContribution: 29,
      },
      {
        developerName: 'Tim',
        hoursWorked: 140,
        overtime: 2,
        totalContribution: 24,
      }
    ]

    For each Developer in a Project
      Find out what Tasks they've been assigned for that Project sorted by time
        create sum , overtime, totalSum
        find out what day the first task was created, set that as relevantDay
        totalSum = 0
        For each Task,
          compare day in date == to relevantDay. if true
            sum+= hoursWorked
             if the sum > 8 {
             overtime= sum-8
           }



    */

    

    // Respond with view.
    return exits.success({
      managers: managers,
      projects: projects,
    });

  }


};
