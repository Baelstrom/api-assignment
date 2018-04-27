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
    let projectsForManager = await Project.find({
      where: { 'managedBy': id }
    })



    sails.log(`Json index 0 is : ${projectsForManager}`)

    return exits.success({'projectsForManager':projectsForManager})

  }


};
