define([
  'views/Signup',
  'utils/$',
  'vendor/underscore'
], function (SignupView, $) {

  function Signup(root_selector, endpoint) {
    this.endpoint = endpoint;
    this.root = $(root_selector);
    if (!this.root) {
      throw new Error('Signup.root is ' + this.root);
    }

    this.views = {
      signup: new SignupView(this.root),
      confirm: null,
      done: null
    };

    // init
    this.init();
  }

  _.extend(Signup.prototype, Validator, {

    init: function () {
      this.views.signup.render();
    }

  });

  return Signup;

});
