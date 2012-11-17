define([
  'utils/$',
  'utils/DOM',
  'utils/Validator',
  'vendor/bean',
  'vendor/bonzo',
  'vendor/underscore'
], function ($, DOM, Validator, bean, bonzo) {

  function Signup(root_selector, endpoint) {
    this.endpoint = endpoint;
    this.root = $(root_selector);
    if (!this.root) {
      throw new Error('Signup.root is ' + this.root);
    }

    this.number = DOM.find(this.root, '.phone');
    this.submit = DOM.find(this.root, '.submit');

    bean.on(this.root, 'submit', _(submit).bind(this));
    bean.on(this.number, 'keyup', _(keyupHandler).bind(this));
  }

  function submit(e) {
    e.preventDefault();
    if (this.validate(this.serialize())) {
      console.log('submitted to ' + this.endpoint, this.serialize());
    } else {
      console.log('invalid');
    }
  }

  function keyupHandler(e) {
    if (this.validate(this.serialize())) {
      console.log('valid');
      bonzo(this.root).addClass('valid');
    } else {
      console.log('invalid');
      bonzo(this.root).removeClass('valid');
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
