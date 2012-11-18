define([
  'views/Signup',
  'utils/View',
  'utils/$',
  'vendor/underscore'
], function (SignupView, View, $) {

  function Signup(root_selector, endpoint) {
    this.endpoint = endpoint;
    this.root = $(root_selector);
    if (!this.root) {
      throw new Error('Signup.root is ' + this.root);
    }

    this.views = [
      new SignupView(this.root),
      new View(this.root, 'done_template')
    ];

    // init
    this.init();
  }

  _.extend(Signup.prototype, {

    init: function () {
      this.current = this.views.shift();
      this.current.bind('done', _(this.next).bind(this)).render();
    },

    next: function () {
      this.current = this.views.shift();
      this.current.render();
    }

  });

  return Signup;

});
