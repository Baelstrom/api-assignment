module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      example: 1
    },

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
      required: true,
      example: 'Requirements Gathering'
    },

    managedBy: {
      type: 'number',
      required: true,
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
    await Project.update(id)
    .set(inputs)
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    // await Project.update()
    return exits.updated('/projects');
  }


};
