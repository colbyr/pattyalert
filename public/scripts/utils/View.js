define([
  'utils/$',
  'vendor/ready',
  'vendor/underscore'
], function ($, ready) {

  function View(root, template_id) {
    this.inited = false;
    this.root = root;
    this.template = null;
    this.template_id = template_id;
  }

  _.extend(View.prototype, {

    init: function () {
      this.template = _.template(
        $(this.template_id).innerHTML
      );
      this.inited = true;
    },

    postRender: function () {},

    render: function (context, append) {
      if (!this.inited) {
        this.init();
      }

      if (append) {
        this.root.innerHTML += this.template(context);
      } else {
        this.root.innerHTML = this.template(context);
      }
      this.postRender();
    },

    serialize: function () {
      return {};
    }

  });

  return View;

});