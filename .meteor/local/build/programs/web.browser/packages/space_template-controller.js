//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Template = Package.templating.Template;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var TemplateController, apiProp;

var require = meteorInstall({"node_modules":{"meteor":{"space:template-controller":{"source":{"template-controller.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/space_template-controller/source/template-controller.js                                          //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var DEFAULT_API = ['state', 'props', 'helpers', 'events', 'onCreated', 'onRendered', 'onDestroyed'];         // 1
                                                                                                             //
// Helpers                                                                                                   //
var withTemplateInstanceContext = function withTemplateInstanceContext(handler) {                            // 6
  return function () {                                                                                       // 7
    return handler.apply(Template.instance(), arguments);                                                    // 8
  };                                                                                                         //
};                                                                                                           //
                                                                                                             //
var bindToTemplateInstance = function bindToTemplateInstance(handlers) {                                     // 12
  for (var _iterator = Object.keys(handlers), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;                                                                                                //
                                                                                                             //
    if (_isArray) {                                                                                          //
      if (_i >= _iterator.length) break;                                                                     //
      _ref = _iterator[_i++];                                                                                //
    } else {                                                                                                 //
      _i = _iterator.next();                                                                                 //
      if (_i.done) break;                                                                                    //
      _ref = _i.value;                                                                                       //
    }                                                                                                        //
                                                                                                             //
    var key = _ref;                                                                                          //
                                                                                                             //
    handlers[key] = withTemplateInstanceContext(handlers[key]);                                              // 14
  }                                                                                                          //
  return handlers;                                                                                           // 16
};                                                                                                           //
                                                                                                             //
var generateReactiveAccessor = function generateReactiveAccessor(defaultValue) {                             // 19
  var value = new ReactiveVar(defaultValue);                                                                 // 20
  return function (newValue) {                                                                               // 21
    if (newValue !== undefined) {                                                                            // 22
      value.set(newValue);                                                                                   // 23
    } else {                                                                                                 //
      return value.get();                                                                                    // 25
    }                                                                                                        //
  };                                                                                                         //
};                                                                                                           //
                                                                                                             //
// Errors                                                                                                    //
var templateNotFoundError = function templateNotFoundError(templateName) {                                   // 31
  var error = new Error('No template <' + templateName + '> found.');                                        // 32
  error.name = 'TemplateNotFoundError';                                                                      // 33
  return error;                                                                                              // 34
};                                                                                                           //
                                                                                                             //
var propertyValidatorRequired = function propertyValidatorRequired() {                                       // 37
  var error = new Error('<data> must be a validator with #clean and #validate methods (see: SimpleSchema)');
  error.name = 'PropertyValidatorRequired';                                                                  // 41
  return error;                                                                                              // 42
};                                                                                                           //
                                                                                                             //
var propertyValidationError = function propertyValidationError(error, templateName) {                        // 45
  error.name = 'PropertyValidationError';                                                                    // 46
  error.message = 'in <' + templateName + '> ' + error.message;                                              // 47
  return error;                                                                                              // 48
};                                                                                                           //
                                                                                                             //
var rootElementRequired = function rootElementRequired() {                                                   // 51
  var error = new Error('Please define a single root DOM element for your template.\n' + 'Learn more about this issue: https://github.com/meteor-space/template-controller/issues/6');
  error.name = 'RootElementRequired';                                                                        // 56
  return error;                                                                                              // 57
};                                                                                                           //
                                                                                                             //
// We have to make it a global to support Meteor 1.2.x                                                       //
TemplateController = function TemplateController(templateName, config) {                                     // 61
  // Template reference                                                                                      //
  var template = Template[templateName];                                                                     // 63
  if (!template) {                                                                                           // 64
    throw templateNotFoundError(templateName);                                                               // 65
  }                                                                                                          //
  var state = config.state;                                                                                  //
  var props = config.props;                                                                                  //
  var helpers = config.helpers;                                                                              //
  var events = config.events;                                                                                //
  var onCreated = config.onCreated;                                                                          //
  var onRendered = config.onRendered;                                                                        //
  var onDestroyed = config.onDestroyed;                                                                      //
                                                                                                             //
  // Remove all standard api props fromt he config so we can have add the                                    //
  // rest to the template instance!                                                                          //
                                                                                                             // 61
  for (var _iterator2 = DEFAULT_API, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    if (_isArray2) {                                                                                         //
      if (_i2 >= _iterator2.length) break;                                                                   //
      apiProp = _iterator2[_i2++];                                                                           // 71
    } else {                                                                                                 //
      _i2 = _iterator2.next();                                                                               //
      if (_i2.done) break;                                                                                   //
      apiProp = _i2.value;                                                                                   //
    }                                                                                                        //
                                                                                                             //
    delete config[apiProp];                                                                                  // 72
  }                                                                                                          //
                                                                                                             //
  // State & private instance methods                                                                        //
  template.onCreated(function () {                                                                           // 61
    var _this = this;                                                                                        //
                                                                                                             //
    if (state) {                                                                                             // 77
      this.state = {};                                                                                       // 78
      // Setup the state as reactive vars                                                                    //
      for (var _iterator3 = Object.keys(state), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref2;                                                                                           //
                                                                                                             //
        if (_isArray3) {                                                                                     //
          if (_i3 >= _iterator3.length) break;                                                               //
          _ref2 = _iterator3[_i3++];                                                                         //
        } else {                                                                                             //
          _i3 = _iterator3.next();                                                                           //
          if (_i3.done) break;                                                                               //
          _ref2 = _i3.value;                                                                                 //
        }                                                                                                    //
                                                                                                             //
        var key = _ref2;                                                                                     //
                                                                                                             //
        this.state[key] = generateReactiveAccessor(state[key]);                                              // 81
      }                                                                                                      //
    }                                                                                                        //
    // Private                                                                                               //
    if (config['private']) {                                                                                 // 76
      for (var _iterator4 = Object.keys(config['private']), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref3;                                                                                           //
                                                                                                             //
        if (_isArray4) {                                                                                     //
          if (_i4 >= _iterator4.length) break;                                                               //
          _ref3 = _iterator4[_i4++];                                                                         //
        } else {                                                                                             //
          _i4 = _iterator4.next();                                                                           //
          if (_i4.done) break;                                                                               //
          _ref3 = _i4.value;                                                                                 //
        }                                                                                                    //
                                                                                                             //
        var _key = _ref3;                                                                                    //
                                                                                                             //
        this[_key] = config['private'][_key];                                                                // 87
      }                                                                                                      //
    }                                                                                                        //
    // Add sugar method for triggering custom jQuery events on the root node                                 //
    this.triggerEvent = function (eventName, data) {                                                         // 76
      // Force best practice of having a single root element for components!                                 //
      if (_this.firstNode !== _this.lastNode) throw rootElementRequired();                                   // 93
      _this.$(_this.firstNode).trigger(eventName, data);                                                     // 94
    };                                                                                                       //
  });                                                                                                        //
                                                                                                             //
  // Default values for props                                                                                //
  if (props) {                                                                                               // 61
    template.onCreated(function () {                                                                         // 100
      var _this2 = this;                                                                                     //
                                                                                                             //
      this.props = {};                                                                                       // 101
      this.autorun(function () {                                                                             // 102
        if (!props.validate) throw propertyValidatorRequired();                                              // 103
        var currentData = Template.currentData() || {};                                                      // 104
        props.clean(currentData);                                                                            // 105
        try {                                                                                                // 106
          props.validate(currentData);                                                                       // 107
        } catch (error) {                                                                                    //
          throw propertyValidationError(error, _this2.view.name);                                            // 109
        }                                                                                                    //
        for (var _iterator5 = Object.keys(currentData), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
          var _ref4;                                                                                         //
                                                                                                             //
          if (_isArray5) {                                                                                   //
            if (_i5 >= _iterator5.length) break;                                                             //
            _ref4 = _iterator5[_i5++];                                                                       //
          } else {                                                                                           //
            _i5 = _iterator5.next();                                                                         //
            if (_i5.done) break;                                                                             //
            _ref4 = _i5.value;                                                                               //
          }                                                                                                  //
                                                                                                             //
          var key = _ref4;                                                                                   //
                                                                                                             //
          var value = currentData[key];                                                                      // 112
          if (!_this2.props[key]) {                                                                          // 113
            _this2.props[key] = generateReactiveAccessor(value);                                             // 114
          } else {                                                                                           //
            _this2.props[key](value);                                                                        // 116
          }                                                                                                  //
        }                                                                                                    //
      });                                                                                                    //
    });                                                                                                      //
  }                                                                                                          //
  // Helpers                                                                                                 //
  if (!helpers) helpers = {};                                                                                // 61
  helpers.state = function () {                                                                              // 124
    return this.state;                                                                                       // 124
  };                                                                                                         //
  helpers.props = function () {                                                                              // 125
    return this.props;                                                                                       // 125
  };                                                                                                         //
  template.helpers(bindToTemplateInstance(helpers));                                                         // 126
                                                                                                             //
  // Events                                                                                                  //
  if (events) {                                                                                              // 61
    template.events(bindToTemplateInstance(events));                                                         // 130
  }                                                                                                          //
                                                                                                             //
  // Lifecycle                                                                                               //
  if (onCreated) template.onCreated(onCreated);                                                              // 61
  if (onRendered) template.onRendered(onRendered);                                                           // 135
  if (onDestroyed) template.onDestroyed(onDestroyed);                                                        // 136
};                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/space:template-controller/source/template-controller.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['space:template-controller'] = {}, {
  TemplateController: TemplateController
});

})();
