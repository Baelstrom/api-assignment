parasails.registerPage('signup', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    // Form data
    formData: { /* … */ },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: function() {
    this.$focus('[autofocus]');
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    submittedForm: function() {

      if(this.isEmailVerificationRequired) {
        // If email confirmation is enabled, show the success message.
        this.cloudSuccess = true;
      }
      else {
        // Otherwise, redirect to the logged-in dashboard.
        // > (Note that we re-enable the syncing state here.  This is on purpose--
        // > to make sure the spinner stays there until the page navigation finishes.)
        this.syncing = true;
        window.location = '/';
      }
    },

    handleParsingForm: function() {

      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate full name:
      if(!argins.fullName) {
        this.formErrors.fullName = true;
      }

      // Validate email:
      var isValidEmailAddress = function(value){
        /* eslint-disable */
        return (function(){function _isByteLength(str,min,max){var len=encodeURI(str).split(/%..|./).length-1;return len>=min&&(typeof max==='undefined'||len<=max)}
        var emailUserUtf8Part=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;var quotedEmailUserUtf8=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;function _isFQDN(str){var options={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1};if(options.allow_trailing_dot&&str[str.length-1]==='.'){str=str.substring(0,str.length-1)}
        var parts=str.split('.');if(options.require_tld){var tld=parts.pop();if(!parts.length||!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)){return!1}}
        for(var part,i=0;i<parts.length;i++){part=parts[i];if(options.allow_underscores){if(part.indexOf('__')>=0){return!1}
        part=part.replace(/_/g,'')}
        if(!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)){return!1}
        if(/[\uff01-\uff5e]/.test(part)){return!1}
        if(part[0]==='-'||part[part.length-1]==='-'||part.indexOf('---')>=0){return!1}}
        return!0};return function(str){var parts=str.split('@'),domain=parts.pop(),user=parts.join('@');var lower_domain=domain.toLowerCase();if(lower_domain==='gmail.com'||lower_domain==='googlemail.com'){user=user.replace(/\./g,'').toLowerCase()}
        if(!_isByteLength(user,0,64)||!_isByteLength(domain,0,256)){return!1}
        if(!_isFQDN(domain)){return!1}
        if(user[0]==='"'){user=user.slice(1,user.length-1);return quotedEmailUserUtf8.test(user)}
        var pattern=emailUserUtf8Part;var user_parts=user.split('.');for(var i=0;i<user_parts.length;i++){if(!pattern.test(user_parts[i])){return!1}}
        return!0}})()(value);
        /* eslint-enable */
      };
      if(!argins.emailAddress || !isValidEmailAddress(argins.emailAddress)) {
        this.formErrors.emailAddress = true;
      }

      // Validate password:
      if(!argins.password) {
        this.formErrors.password = true;
      }

      // Validate password confirmation:
      if(argins.password && argins.password !== argins.confirmPassword) {
        this.formErrors.confirmPassword = true;
      }

      // Validate ToS agreement:
      if(!argins.agreed) {
        this.formErrors.agreed = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    }

  }
});
