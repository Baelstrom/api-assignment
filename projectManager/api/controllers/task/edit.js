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

    id : {
      type: 'number',
      example: 1
    },


  },

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something went wrong~ please try again!'
    },

    success: {
      viewTemplatePath: 'pages/project/edit-project'
    },

    updated: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let id = inputs.id
    delete inputs['id']
    sails.log("Inputs are",inputs)
    // else if the action recieves a POST request then update the Project information
    await Task.update(id)
    .set(inputs)
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    // await Project.update()
    return exits.updated('/tasks');
  }


};
