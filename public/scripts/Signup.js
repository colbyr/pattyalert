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
    if (this.validate(this.serialize())) {
      console.log('submitted to ' + this.endpoint, this.serialize());
    } else {
      console.log('invalid');
    }
  }

  _.extend(Signup.prototype, Validator, {

    rules: {
      'phone': /^1?[0-9]{10}$/
    },

    serialize: function () {
      return {
        phone: this.number.value.replace(/[\-\(\)\s]/g, '')
      };
    }

  });

  return Signup;

});
