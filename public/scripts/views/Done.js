define([
  'utils/DOM',
  'utils/View',
  'vendor/bean'
], function (DOM, View, bean) {

  var TEMPLATE = 'done_template';

  function DoneView(root) {
    this.events = {};
    this.inited = false;
    this.template_id = TEMPLATE;
    this.root = root;

    if (!this.root) {
      throw new Error('View.root is not defined');
    }

  }

  _.extend(DoneView.prototype, View.prototype, {

    postRender: function () {
      window.setTimeout(
        _(function () {
          this.fire('next', 'complete');
        }).bind(this), 15000);
    }

  });

  return DoneView;
});
