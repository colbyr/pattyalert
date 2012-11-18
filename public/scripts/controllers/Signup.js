define([
  'views/Done',
  'views/Signup',
  'utils/$',
  'vendor/underscore'
], function (DoneView, SignupView, $) {

  function Signup(root_selector, endpoint) {
    this.endpoint = endpoint;
    this.root = $(root_selector);
    if (!this.root) {
      throw new Error('Signup.root is ' + this.root);
    }

    this.views = [
      new SignupView(this.root),
      new View(this.root, 'done_template');
    ];

    // init
    this.init();
  }

  _.extend(Signup.prototype, {

    init: function () {
      this.views.shift().bind('done', _(this.next).bind(this)).render();
    },

    next: function () {
      this.views.shift().render();
    }

  });

  return Signup;

});
