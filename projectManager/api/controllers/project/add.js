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

  },


  exits: {

    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/project/view-one-project'
    }

  },


  fn: async function (inputs, exits) {

    let { projectName, clientName, status} = inputs;

    let newRecord = await Project.create(Object.assign({
      name: projectName,
      clientName: clientName,
      status: status,
    }))
    .fetch()

    sails.log('newRecord created~: ', newRecord)

    // Respond with view.
    return exits.success({
      projectName: projectName,
      clientName: clientName,
      status: status,
    });

  }


};
