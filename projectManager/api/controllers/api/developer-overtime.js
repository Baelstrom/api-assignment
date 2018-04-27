module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  exits: {

    err: {
      statusCode: 500,
      description: 'There seems to be a problem with our sails, Captain.',
    },
    success: {
      statusCode: 200,
      description: 'Calculated.',
    },

  },


  fn: async function (inputs, exits) {


    let { id } = this.req.params


    // get the tasks for the developer
    let tasksForDeveloper = await Task.find({
      where: { 'assignedTo': id }
    })

    // find total hours for each task the dev has
    let totalHoursWorked = 0
    tasksForDeveloper.forEach( task => {
      totalHoursWorked+= task.overtimeHours
    })

    sails.log(`total hours are :`,totalHoursWorked)

    return exits.success({'totalHoursOvertimeWorked':totalHoursWorked})

  }


};
