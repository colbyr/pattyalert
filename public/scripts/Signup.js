define([
  'utils/$',
  'utils/DOM',
  'utils/Validator',
  'vendor/bean',
  'vendor/underscore'
], function ($, DOM, Validator, bean) {

  function Signup(root_selector, endpoint) {
    this.endpoint = endpoint;
    this.root = $(root_selector);
    if (!this.root) {
      throw new Error('Signup.root is ' + this.root);
    }

    this.number = DOM.find(this.root, '.phone');

    bean.on(this.root, 'submit', _(submit).bind(this));
  }

  function submit(e) {
    e.preventDefault();
    if (this.validate()) {
      console.log('submitted to ' + this.endpoint, this.serialize());
    } else {
      console.log('invalid');
    }
  }

  _.extend(Signup.prototype, Validator, {

    rules: {
    },

    serialize: function () {
      return {
        phone_number: this.number.value
      };
    }

  });

  return Signup;

});
