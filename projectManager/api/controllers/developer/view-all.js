module.exports = {


  friendlyName: 'View all',


  description: 'Display "All" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/developer/all'
    }

  },


  fn: async function (inputs, exits) {
    // get all users.

    // let query = User.find().exec( (err,result) => {
    //   if(err){return err}
    //   sails.log('the result for the query is : \n',JSON.stringify(result))
    // })
    // sails.log('the query is now :',query)


    let result = await User.find();

    // Respond with view.
    return exits.success( { users : result } );

  }


};
