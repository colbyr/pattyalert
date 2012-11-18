define([
  'utils/DOM',
  'utils/View',
  'vendor/bean'
], function (DOM, View, bean) {

  var TEMPLATE = 'signedup_template';

  function CompleteView(root) {
    this.events = {};
    this.inited = false;
    this.template_id = TEMPLATE;
    this.link = null;
    this.root = root;

    if (!this.root) {
      throw new Error('View.root is not defined');
    }
  }

  function next(e) {
    e.preventDefault();
    this.fire('next', 'signup');
  }

  _.extend(CompleteView.prototype, View.prototype, {

    postRender: function () {
      this.link = DOM.find(this.root, '.new_number');
      bean.on(this.link, 'click', _(next).bind(this));
    },

  });

  return CompleteView;
});
