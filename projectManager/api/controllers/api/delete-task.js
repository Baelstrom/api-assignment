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
      description: 'Record successfully deleted',
    },

  },


  fn: async function (inputs, exits) {


    let { id } = this.req.params

    // first check if the task exists in a project
    // if so then abort
    // else then you need to remove the association from the developers + project
    // then drop the stripeCustomerId

    // get the task in question first
    let task = await Task.findOne(id)

    sails.log(`the task being destroyed is:
    `,task)
    // since a task cannot exist without a project we'll just delete it from the projects side
    await Project.removeFromCollection(task.project,'tasks')
    .members(task.id)

    // remove from User
    await User.removeFromCollection(task.assignedTo,'assignedTasks')
    .members(task.id)

    // time to say your goodbyes
    await Task.destroy(task.id)

    sails.log(`task #${id} has been destroyed!`)

    return exits.success()

  }


};
