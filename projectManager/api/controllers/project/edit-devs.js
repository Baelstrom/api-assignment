require

module.exports = {


  friendlyName: 'View projects',


  description: 'Display "edit project page" with all the relevant data for that project already filled in',

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something went wrong~ please try again!'
    },

    success: {
      viewTemplatePath: 'pages/project/edit-devs'
    },

  },


  fn: async function (inputs, exits) {

    // if the action recieves a GET request then show the user an EDIT information
      let { id } = this.req.params

      // get managers
      let developers = await User.find({
       status: {'!=' : 'archived'}
      })
      .intercept((err)=>{
         err.message = 'Uh oh: '+err.message;
         return err;
      })

      // get Project
      let project = await Project.find(id)
      .populate('developers')
      .intercept((err)=>{
         err.message = 'Uh oh: '+err.message;
         return err;
      })
      project = project[0]


      // get selected developers
      sails.log('project are :',project)
      sails.log('devs are :',project.developers)
      notSelectedDevelopers = developers

      if(project.developers){
        // get an array of all the project.developer id's
        // get an array of all the developer id's
        // compare two arrays
        // use the resulting difference to get the difference of selected devs
        project.developers.forEach( item => {
           developers.forEach( item2 => {
            if ( item.id == item2.id) {
              notSelectedDevelopers.splice(developers.indexOf(item2),1)
            }
          })
        })
      }

      sails.log('not selected developers are',notSelectedDevelopers)


      // Respond with view.
      return exits.success({
        developers: developers,
        notSelectedDevelopers: notSelectedDevelopers,
        project: project,
      })


    }
}
