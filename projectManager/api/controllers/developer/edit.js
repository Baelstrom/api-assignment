module.exports = {


  friendlyName: 'Edit a single developer',


  description: 'used to edit a developer and then redirect to the developers page',

  inputs: {

    id: {
      type: 'number',
      required: true,
      example: 1
    },

    fullName: {
      type: 'string',
      required: true,
      example: 'Avara'
    },

    emailAddress: {
      type: 'string',
      required: true,
      example: 'Mocha Industries'
    },

    status: {
      type: 'string',
      required: true,
      example: 'Requirements Gathering'
    },

    monthlySalary: {
      type: 'number',
      required: true,
      example: 1
    },

    overtimeRate: {
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

    updated: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let id = inputs.id
    // ensures id cannot be updated
    delete inputs['id']

    sails.log("Inputs are",inputs)
    // else if the action recieves a POST request then update the Project information
    await User.update(id)
    .set(inputs)
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    return exits.updated('/developers');
  }


};
