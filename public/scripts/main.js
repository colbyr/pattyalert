define([
  'Signup',
  'vendor/ready',
  'vendor/underscore'
], function (Signup, ready) {

  window.PattyAlert = {};

  ready(function () {
    PattyAlert.signup = new Signup('signup', 'signup');
  });

});