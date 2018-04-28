module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  inputs: {

    developer: {
      type: 'number',
      example: 1
    },

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

    let { developer, id, } = inputs;

    // create Project
    await Project.addToCollection(id, 'developers')
    .members(inputs.developer)


    // Respond with view.
    return exits.success('/projects/' + inputs.id +'/edit-devs');

  }


};
