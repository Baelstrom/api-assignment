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

    let tasks = await Task.find({
      status: { '!=' : ['Archived'] }
    })
    developers.forEach( dev => {
      let totalWorkHours = 0
      let totalOvertimeHours = 0
      tasks.forEach (task => {
        if ( task.assignedTo === dev.id ) {
          totalWorkHours+= task.workHours
          totalOvertimeHours += task.overtimeHours
        }
      })
      dev.totalWorkHours = totalWorkHours
      dev.totalOvertimeHours = totalOvertimeHours
    })

    sails.log('The devs are:', developers)
    // Respond with view.
    return exits.success({
      developers: developers,
    });

  }


};
