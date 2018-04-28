/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',
  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'deliver-contact-form-message': true,

  // only super-admins or managers can update projects
  // Basic Creates
  'project/add': 'is-super-admin-or-manager',
  'project/add-a-dev': 'is-super-admin-or-manager',
  'project/remove-a-dev': 'is-super-admin-or-manager',

  // Basic Edits
  'project/edit': 'is-super-admin-or-manager',
  'developer/edit': 'is-super-admin-or-manager',

  // Basic Archives
  // only super-admins or managers can archive projects
  // only super-admins or managers can add / remove developers from a project
  'project/archive': 'is-super-admin-or-manager',
  'task/archive': 'is-super-admin-or-manager',

};
