define([
  'mixins/Validator',
  'utils/DOM',
  'utils/View',
  'vendor/bean',
  'vendor/bonzo',
  'vendor/reqwest'
], function (Validator, DOM, View, bean, bonzo, reqwest) {

  var TEMPLATE = 'signup_template';

  function SignupView(root) {
    this.events = {};
    this.inited = false;
    this.number = null;
    this.submit = null;
    this.template_id = TEMPLATE;
    this.root = root;
    this.form = null;

    if (!this.root) {
      throw new Error('SignupView.root is not defined');
    }
  }

  function submit(e) {
    e.preventDefault();
    var self = this;
    var data = this.serialize();
    if (this.validate(data)) {
      reqwest({
        url: '/sign_up',
        method: 'post',
        type: 'json',
        data: {
          number: this.format(data.phone)
        },
        success: function (resp) {
          console.log(resp);
          localStorage.setItem('signedUp', true);
          if (resp.exists) {
            self.fire('next', 'complete');
          } else {
            self.fire('next', 'done');
          }
        }
      });
      this.fire('next', 'loader');
    } else {
      console.log('invalid');
    }
  }

  function keyupHandler(e) {
    if (this.validate(this.serialize())) {
      bonzo(this.form).addClass('valid');
    } else {
      bonzo(this.form).removeClass('valid');
    }
  }

  _.extend(SignupView.prototype, View.prototype, Validator, {

    format: function (number) {
      var number = '' + number;
      if (number.charAt(0) !== '1') {
        number = '1' + number;
      }
      return '+' + number;
    },

    postRender: function () {
      this.form = DOM.find(document.body, '.signup-form');
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
