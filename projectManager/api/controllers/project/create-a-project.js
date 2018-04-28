module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  inputs: {

    projectName: {
      type: 'string',
      required: true,
      example: 'Avara'
    },

    clientName: {
      type: 'string',
      required: true,
      example: 'Mocha Industries'
    },

    status: {
      type: 'string',
      example: 'Requirements Gathering'
    },

    manager: {
      type: 'number',
      example: 1
    },


  },


  exits: {

    success: {
      responseType: 'redirect',
      // viewTemplatePath: 'pages/project/view-one-project'
    }

  },


  fn: async function (inputs, exits) {

    let { projectName, clientName, status, manager} = inputs;

    // create Project
    let newRecord = await Project.create(Object.assign({
      name: projectName,
      clientName: clientName,
      status: status,
      managedBy: manager,
    }))
    .fetch()

    // add association
    // await User.addToCollection(manager, 'manages')
    // .members([newRecord.id])


    sails.log('newRecord created~: ', newRecord)

    // Respond with view.
    return exits.success('/Projects');

  }


};
