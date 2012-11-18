define([
  'vendor/qwery'
], function (q) {

  return {

    find: function (context, selector) {
      return q(selector, context)[0];
    },

    search: function (context, selector) {
      return q(selector, context);
    }

  };

});
