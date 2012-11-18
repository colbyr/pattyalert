define([
  'views/Complete',
  'views/Done',
  'views/Signup',
  'utils/View',
  'utils/$',
  'vendor/underscore'
], function (CompleteView, DoneView, SignupView, View, $) {

  function Signup(root_selector, endpoint) {
    this.current = null;
    this.endpoint = endpoint;
    this.root = $(root_selector);
    if (!this.root) {
      throw new Error('Signup.root is ' + this.root);
    }

    this.views = {
      complete: new CompleteView(this.root),
      signup: new SignupView(this.root),
      done: new DoneView(this.root),
      loader: new View(this.root, 'loader_template')
    }

    if (this.isSignedUp()) {
      this.current = this.views.complete;
    } else {
      this.current = this.views.signup;
    }

    // init
    this.init();
  }

  _.extend(Signup.prototype, {

    isSignedUp: function () {
      return localStorage.getItem('signedUp') === 'true';
    },

    init: function () {
      for (var k in this.views) {
        this.views[k].bind('next', _(this.next).bind(this));
      }
      this.current.render();
    },

    next: function (next_view) {
      console.log('going to ', next_view);
      this.current = this.views[next_view];
      this.current.render();
    }

  });

  return Signup;

});
