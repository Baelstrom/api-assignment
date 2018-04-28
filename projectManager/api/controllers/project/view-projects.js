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
    .populate('developers')
    .populate('tasks')
    .intercept((err)=>{
      err.message = 'Uh oh: '+err.message;
      return err;
    })

    sails.log('devs are :',projects[0].developers)
    sails.log('tasks are :',projects[0].tasks)


    // for each project we have
    projects.forEach( project => {

      // create a var to hold all dev summaries for a project
      let projectSummary = {}

      // set prooject id and create a null array for dev details
      projectSummary.projectId = project.id
      projectSummary.developerDetails = []

      // get list of devs on that project
      let developersOnProject = project.developers

      let totalProjectHoursWorked = 0
      // get all the dev details through :
      // for each developer on a project
      developersOnProject.forEach( developer => {
        let developerSummary = {}
        let individualWorkHours = 0
        let individualOvertimeHours = 0

        // go through the tasks a project has
        project.tasks.forEach ( task => {

          // if the task is assigned to the developer
          if(task.assignedTo === developer.id) {
            // get their work hours
            individualWorkHours += task.workHours
            individualOvertimeHours += task.overtimeHours
            // add their individual work hours to the total project work hours
            totalProjectHoursWorked += task.workHours + task.overtimeHours
          }

        })

        // bu the end of the forEach loop above we have all the data ready for one dev
        // add it to a developerSummary Object
        developerSummary.id = developer.id
        developerSummary.fullName = developer.fullName
        developerSummary.workHours = individualWorkHours
        developerSummary.overTimeHours = individualOvertimeHours

        // add all details for this one developer into a developerDetails array
        projectSummary.developerDetails.push(developerSummary)

      }) // end of developers forEach

      // set total project work hours
      projectSummary.totalProjectHours = totalProjectHoursWorked


      // get the contribution per developer by looping through projectSummary.developerDetails
      projectSummary.developerDetails.forEach( developer => {
        let {workHours, overTimeHours} = developer // take out variables fpr hours worked
        let {totalProjectHours} = projectSummary // take out total project hours
        // taking out the individual vars creats a neater formula to view below
        developer.contribution = (( workHours + overTimeHours )/totalProjectHours)*100
      })
      // add final array to initial project object
      project.projectSummary = projectSummary
    }) // end of projects forEach

    sails.log('example projectSummary for index 0 :',projects[0].projectSummary)

    // Respond with view.
    return exits.success({
      managers: managers,
      projects: projects,
    });

  }


};
