define([
  'views/Complete',
  'views/Signup',
  'utils/View',
  'utils/$',
  'vendor/underscore'
], function (Complete, SignupView, View, $) {

  function Signup(root_selector, endpoint) {
    this.endpoint = endpoint;
    this.root = $(root_selector);
    if (!this.root) {
      throw new Error('Signup.root is ' + this.root);
    }

    if (this.isSignedUp()) {
      this.views = [
        new CompleteView(this.root),
        new SignupView(this.root),
        new View(this.root, 'done_template')
      ];
    } else {
      this.views = [
        new SignupView(this.root),
        new View(this.root, 'done_template')
      ];
    }

    // init
    this.init();
  }

  _.extend(Signup.prototype, {

    isSignedUp: function () {
      return localStorage.getItem('signedUp') === 'true';
    },

    init: function () {
      this.current = this.views.shift();
      this.current.bind('next', _(this.next).bind(this)).render();
    },

    next: function () {
      this.current = this.views.shift();
      this.current.render();
    }

  });

  return Signup;

});
