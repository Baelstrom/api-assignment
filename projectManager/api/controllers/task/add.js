module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',


  inputs: {

    name: {
      type: 'string',
      required: true,
      example: 'Avara'
    },

    description: {
      type: 'string',
      required: true,
      example: 'Mocha Industries'
    },

    workHours: {
      type: 'number',
      example: 1
    },

    overtimeHours: {
      type: 'number',
      example: 1
    },

    status: {
      type: 'string',
      required: true,
      example: 'Requirements Gathering'
    },

    project: {
      type: 'number',
      required: true,
      example: 1
    },

    assignedTo: {
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

    sails.log('the inputs for this form are: ', inputs)
    // create Task
    let newRecord = await Task.create(inputs)
    .fetch()

    // retrieve new record
    newRecord = await Task.find({
      where: {id: newRecord.id},
    })
    .populate('project')
    .populate('assignedTo')


    sails.log('newRecord created~: ', newRecord)

    // Respond with view.
    return exits.success('/tasks');

  }


};
