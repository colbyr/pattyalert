define([
  'vendor/underscore'
], function () {

  return {

    check: function (rule, value) {
      return this.rules[rule].test(value);
    },

    validate: function (data) {
      if (!this.rules) {
        throw new Error('Validator.validate: rules object not found');
      }

      var valid = true;
      for (var k in data) {
        if (this.rules.hasOwnProperty(k) && !this.check(k, data[k])) {
          valid = false;
        }
      }
      return valid;
    }

  };

});
