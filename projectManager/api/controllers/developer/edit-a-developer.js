module.exports = {


  friendlyName: 'Display edit developer',


  description: 'Display "edit developer page" with all the relevant data for that project already filled in',

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something went wrong~ please try again!'
    },

    success: {
      viewTemplatePath: 'pages/developer/edit-developer'
    },

  },


  fn: async function (inputs, exits) {

    // if the action recieves a GET request then show the user an EDIT information
      let { id } = this.req.params

      // get managers
      let user = await User.findOne(id)
      .intercept((err)=>{
         err.message = 'Uh oh: '+err.message;
         return err;
      })


      sails.log(user)

      // Respond with view.
      return exits.success({
        developer: user,
      })


    }
}
