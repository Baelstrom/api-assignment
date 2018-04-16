/**
 * Project.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200,
      example: 'Avara'
    },

    clientName: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200,
      example: 'Mocha Industries'
    },

    description: {
      type: 'string',
      maxLength: 200,
      example: 'build coffee dancing application'
    },

    // The two attrbiutes commmented out :
    // Are not yet required because it's not asked for in the assignment itself.
    // Just more work if I feel like I can spare the time

    // expectedHours: {
    //   type: 'number',
    //   defaultsTo: 0,
    //   example: '120'
    // },
    //
    // actualHours: {
    //   type: 'number',
    //   defaultsTo: 0,
    //   example: '121'
    // },

    status: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200,
      example: 'Avara'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    developers: {
      collection: 'user',
      via: 'projects'
    },

    tasks: {
      collection: 'task',
      via: 'project'
    },

    managedBy: {
      model: 'user',
    }

  },

};
