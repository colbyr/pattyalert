define([
  'utils/$',
  'vendor/ready',
  'vendor/underscore'
], function ($, ready) {

  function View(root, template_id) {
    this.events = {};
    this.inited = false;
    this.root = root;
    this.template = null;
    this.template_id = template_id;

    if (!this.root) {
      throw new Error('View.root is not defined');
    }
  }

  _.extend(View.prototype, {

    bind: function (type, callback) {
      if (!this.events.hasOwnProperty(type)) {
        this.events[type] = [];
      }
      this.events[type].push(callback);
      return this;
    },

    fire: function (type) {
      if (this.events.hasOwnProperty(type)) {
        var args = Array.prototype.slice.call(arguments, 1);
        _(this.events[type]).each(function (callback) {
          callback.apply(null, args);
        });
      } else {
        throw new Error('View.fire: event "' + type + '" not defined');
      }
    },

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