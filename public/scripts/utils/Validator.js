define([
  'vendor/underscore'
], function () {

  return {

    validate: function () {
      if (!this.rules) {
        throw new Error('Validator.validate: rules object not found');
      }

      return false;
    }

  };

});
