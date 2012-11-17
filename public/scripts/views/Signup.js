define([
  'utils/DOM',
  'utils/View',
  'vendor/bean'
], function (DOM, View, bean) {

  var TEMPLATE = 'signup_template';

  function SignupView(root) {
    this.inited = false;
    this.number = null;
    this.submit = null;
    this.template_id = TEMPLATE;
    this.root = root;
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

  _.extend(SignupView.prototype, View.prototype, {

    postRender: function () {
      this.number = DOM.find(this.root, '.phone');
      this.submit = DOM.find(this.root, '.submit');

      bean.on(this.root, 'submit', _(submit).bind(this));
      bean.on(this.number, 'keyup', _(keyupHandler).bind(this));
    },

    rules: {
      'phone': /^1?[0-9]{10}$/
    },

    serialize: function () {
      return {
        phone: this.number.value.replace(/[\-\(\)\s]/g, '')
      };
    }

  });

  return SignupView;
});
