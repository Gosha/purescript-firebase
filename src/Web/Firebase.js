'use strict';
var Firebase = require('firebase');
// module Web.Firebase

exports.newFirebaseImpl = function (uri) {
    return function () {
        return new Firebase(uri);
    };
};

exports.childImpl = function (childPath, firebase) {
    return function () {
        return firebase.child(childPath);
    };
};

exports.onImpl = function (eventType, callback, cancelCallback, fb) {
    return function () {
        return fb.on(eventType, callback, cancelCallback);
    };
};

exports.onWithoutCancelCallbackImpl = function (eventType, callback, fb) {
    console.log("without error callback, should be possible according to documentation");
    return function () {
        return fb.on(eventType, callback);
    };
};

exports.onSimple = function (fb) {
  return function() {
    return fb.off();
  };
};

exports.onceImpl = function(eventType, callback, errorCallback, fb) {
    var logDecorator = function(error) {
      errorCallback(error)();
    }
    return function () {
      fb.once(eventType, callback, logDecorator);
    };
};

exports.setImpl = function (value, onComplete, fb) {
    return function () {
        fb.set(value, onComplete === null ? undefined : onComplete);
    };
};

// onComplete passes null for error when success, and a FirebaseErr on error
exports.setEImpl = function (value, onComplete, fb) {
    var runEffect  = function (error) {
      onComplete(error)();
    }
    return function () {
        fb.set(value, runEffect);
    };
};
/*
 * https://www.firebase.com/docs/web/api/firebase/push.html
 * Generate a new child location using a unique name and returns a Firebase reference to it. This is useful when the children of a database location represent a collection of items. See Saving Lists of Data.
 *
 * You can optionally pass a value to push() and the value will be immediately written to the generated location. If you don't pass a value to push(), nothing is written and the child will remain empty unless written to using set().
 *
 * The unique name generated by push() is prefixed with a client-generated timestamp so that the resulting list will be chronologically-sorted.
 *
 */

exports.pushImpl = function (value, onError, fb) {
    var runEffect  = function (error) {
      onError(error)();
    }
    return function () {
        return fb.push(value, onError === null ? undefined : runEffect);
    };
};

// extra to firebase api, explicit error handling
exports.pushEImpl = function (value, onError, fb) {
    var runEffect  = function (error) {
      onError(error)();
    }
    return function () {
        return fb.push(value, runEffect);
    };
};
