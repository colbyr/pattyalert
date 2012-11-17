define([
  'Signup',
  'vendor/ready',
  'vendor/skrollr',
  'vendor/underscore'
], function (Signup, ready, skrollr) {

  window.PattyAlert = {};

  ready(function () {
    PattyAlert.signup = new Signup('signup', 'signup');
    PattyAlert.skrollr = skrollr.init();
  });

});