module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  inputs: {

    id: {
      type: 'number',
      example: 1
    },

  },


  exits: {

    success: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let { id } = inputs;

    await Project.update(id)
    .set({
      status: 'Archived',
    })

    sails.log(`project record #{${id}} has been archived!`)

    // Respond with view.
    return exits.success('/Projects');

  }


};
