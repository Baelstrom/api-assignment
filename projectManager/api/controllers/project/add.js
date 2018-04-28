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

    managedBy: {
      type: 'number',
      example: 1
    },


  },


  exits: {

    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/project/view-one-project'
    }

  },


  fn: async function (inputs, exits) {

    let { projectName, clientName, status, managedBy} = inputs;

    // create Project
    let newRecord = await Project.create(Object.assign({
      name: projectName,
      clientName: clientName,
      status: status,
      managedBy: managedBy,
    }))
    .fetch()

    // add association
    // await User.addToCollection(manager, 'manages')
    // .members([newRecord.id])

    // retrieve new record
    newRecord = await Project.find({
      where: {id: newRecord.id},
    })
    .populate('managedBy')


    sails.log('newRecord created~: ', newRecord)

    // Respond with view.
    return exits.success({
      projectName: projectName,
      clientName: clientName,
      status: status,
      manager: newRecord.managedBy,
    });

  }


};
