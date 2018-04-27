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

    await Task.update(id)
    .set({
      status: 'archived',
    })

    sails.log(`task record #{${id}} has been archived!`)

    // Respond with view.
    return exits.success('/Tasks');

  }


};
