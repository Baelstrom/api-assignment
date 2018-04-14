/**
 * Task.js
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
      maxLength: 200,
      example: 'Make X Component Responsive'
    },

    description: {
      type: 'string',
      maxLength: 300,
      example: 'Component does not render properly on mobile devices'
    },

    workHours: {
      type: 'number',
      defaultsTo: 0,
      example: '4'
    },

    overtimeHours: {
      type: 'number',
      defaultsTo: 0,
      example: '2'
    },

    // eventually it'd be pretty cool if each task had a log of what was done on it.
    // could be tracked if status had it's own table and was referenced in a taskHistory collection maybe
    status: {
      type: 'string',
      defaultsTo: 'backlog',
      isIn: [
        'archived',
        'backlog',
        'active',
        'work in progress',
        'pending review',
        'reviewed',
        'pending UAT',
        'UAT passed',
        'pending deployment',
        'done'],
      example: 'work in progress',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    project: {
      model: 'project',
      unique: true
    },

    assignedTo: {
      model: 'user',
      unique: true
    }
  },

};
