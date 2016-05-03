var require = meteorInstall({"lib":{"functions.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/functions.js                                                                                                //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
String.prototype.firstToType = function () {                                                                       // 1
    var type = arguments.length <= 0 || arguments[0] === undefined ? 'lower' : arguments[0];                       //
                                                                                                                   //
    switch (type) {                                                                                                // 2
        case 'lower':                                                                                              // 3
            return this.charAt(0).toLowerCase() + this.slice(1);                                                   // 4
            break;                                                                                                 // 5
        case 'upper':                                                                                              // 2
            return this.charAt(0).toUpperCase() + this.slice(1);                                                   // 7
            break;                                                                                                 // 8
    }                                                                                                              // 2
};                                                                                                                 //
                                                                                                                   //
isEmpty = function isEmpty(obj) {                                                                                  // 12
    return Object.getOwnPropertyNames(obj).length === 0;                                                           // 13
};                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"invoiceCollection.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/invoiceCollection.js                                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
invoices = new Mongo.Collection("invoices");                                                                       // 1
invoices.limit_results_by = 50;                                                                                    // 2
invoices.limit_increase_by = 50;                                                                                   // 3
invoices.byTimeRange = function () {                                                                               // 4
  var timeRange = arguments.length <= 0 || arguments[0] === undefined ? "today" : arguments[0];                    //
  var queryParams = arguments[1];                                                                                  //
                                                                                                                   //
  var limit = invoices.limit_results_by;                                                                           // 5
                                                                                                                   //
  if (queryParams !== undefined && queryParams.hasOwnProperty('limit')) {                                          // 7
    limit = parseInt(queryParams.limit);                                                                           // 8
    delete queryParams['limit'];                                                                                   // 9
  }                                                                                                                //
                                                                                                                   //
  queryParams = isEmpty(queryParams) ? { sortCreatedAt: "DESC", sortTotal: "ASC" } : queryParams;                  // 12
                                                                                                                   //
  console.log(queryParams);                                                                                        // 14
  var sort = {};                                                                                                   // 15
  var filter = {};                                                                                                 // 16
  for (var k in meteorBabelHelpers.sanitizeForInObject(queryParams)) {                                             // 17
    console.log('k', k);                                                                                           // 18
    if (k.indexOf('sort') > -1) {                                                                                  // 19
      sort[k.replace('sort', '').firstToType('lower')] = queryParams[k] === 'DESC' ? -1 : 1;                       // 20
    } else if (k.indexOf('filter') > -1) {                                                                         //
      if (!isNaN(parseInt(queryParams[k])) && queryParams[k] !== "") {                                             // 22
        filter[k.replace('filter', '').firstToType('lower')] = isNaN(parseInt(queryParams[k])) ? queryParams[k] : parseInt(queryParams[k]);
      }                                                                                                            //
    }                                                                                                              //
  }                                                                                                                //
                                                                                                                   //
  var getTimeRange = function getTimeRange(timeRange) {                                                            // 28
    var _today = new Date();                                                                                       // 29
    var timeRanges = {                                                                                             // 30
      today: function () {                                                                                         // 31
        function today() {                                                                                         //
          _today.setSeconds(0);                                                                                    // 32
          _today.setMinutes(0);                                                                                    // 33
          _today.setHours(0);                                                                                      // 34
          return _today;                                                                                           // 35
        }                                                                                                          //
                                                                                                                   //
        return today;                                                                                              //
      }(),                                                                                                         //
      week: function () {                                                                                          // 37
        function week() {                                                                                          //
          return new Date(_today.getFullYear(), _today.getMonth(), _today.getDate() - 7);                          // 38
        }                                                                                                          //
                                                                                                                   //
        return week;                                                                                               //
      }(),                                                                                                         //
      month: function () {                                                                                         // 40
        function month() {                                                                                         //
          return new Date(_today.getFullYear(), _today.getMonth() - 1, _today.getDate());                          // 41
        }                                                                                                          //
                                                                                                                   //
        return month;                                                                                              //
      }(),                                                                                                         //
      all: function () {                                                                                           // 43
        function all() {                                                                                           //
          return false;                                                                                            // 44
        }                                                                                                          //
                                                                                                                   //
        return all;                                                                                                //
      }()                                                                                                          //
    };                                                                                                             //
                                                                                                                   //
    if (timeRanges[timeRange]) {                                                                                   // 48
      return timeRanges[timeRange]();                                                                              // 49
    } else {                                                                                                       //
      return timeRanges['today']();                                                                                // 51
    }                                                                                                              //
  };                                                                                                               //
                                                                                                                   //
  var selectedDate = getTimeRange(timeRange);                                                                      // 55
                                                                                                                   //
  if (selectedDate !== false) filter.createdAt = { '$gte': selectedDate };                                         // 58
  console.log(filter);                                                                                             // 59
  return invoices.find(filter, { sort: sort });                                                                    // 60
};                                                                                                                 //
                                                                                                                   //
/*                                                                                                                 //
TODO implement this                                                                                                //
                                                                                                                   //
invoices.createFilter = function(params){                                                                          //
  let fn;                                                                                                          //
  const typeCaster = function(type, variable) {                                                                    //
    const types = {                                                                                                //
      text(v) {                                                                                                    //
        return v;                                                                                                  //
      },                                                                                                           //
      number(v) {                                                                                                  //
        return parseInt(v);                                                                                        //
      },                                                                                                           //
      date(v) {                                                                                                    //
        return new Date(v);                                                                                        //
      }                                                                                                            //
    };                                                                                                             //
    if(types[type]) {                                                                                              //
      return types[type](variable);                                                                                //
    } else {                                                                                                       //
      return types['text'](variable);                                                                              //
    }                                                                                                              //
  };                                                                                                               //
  let filter = {};                                                                                                 //
  params.forEach(function(param){                                                                                  //
    filter[param.name] = typeCaster(params.type, params,value);                                                    //
  });                                                                                                              //
                                                                                                                   //
  console.log(filter);                                                                                             //
};                                                                                                                 //
  */                                                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// lib/router.js                                                                                                   //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
FlowRouter.route("/:type", {                                                                                       // 1
    name: "invoices",                                                                                              // 2
    subscriptions: function () {                                                                                   // 3
        function subscriptions(params, queryParams) {                                                              // 3
            this.register("invoiceCollection", Meteor.subscribe("invoiceCollection", params.type, queryParams));   // 4
        }                                                                                                          //
                                                                                                                   //
        return subscriptions;                                                                                      //
    }(),                                                                                                           //
    action: function () {                                                                                          // 6
        function action(params, queryParams) {                                                                     // 6
            BlazeLayout.render("invoicesTemplate");                                                                // 7
        }                                                                                                          //
                                                                                                                   //
        return action;                                                                                             //
    }()                                                                                                            //
});                                                                                                                //
FlowRouter.route("/", {                                                                                            // 10
    action: function () {                                                                                          // 11
        function action(params, queryParams) {                                                                     // 11
            Router.go({ type: 'all' });                                                                            // 12
        }                                                                                                          //
                                                                                                                   //
        return action;                                                                                             //
    }()                                                                                                            //
});                                                                                                                //
                                                                                                                   //
Router = {                                                                                                         // 16
    route: '',                                                                                                     // 17
    reactvar: new ReactiveVar(0),                                                                                  // 18
    setRoute: function () {                                                                                        // 19
        function setRoute(routeName) {                                                                             // 19
            this.route = routeName;                                                                                // 20
        }                                                                                                          //
                                                                                                                   //
        return setRoute;                                                                                           //
    }(),                                                                                                           //
                                                                                                                   //
    resetQuery: function () {                                                                                      // 23
        function resetQuery() {                                                                                    // 23
            FlowRouter.go(FlowRouter.path(this.route, FlowRouter.current().params));                               // 24
        }                                                                                                          //
                                                                                                                   //
        return resetQuery;                                                                                         //
    }(),                                                                                                           //
                                                                                                                   //
    go: function () {                                                                                              // 27
        function go(routeParams) {                                                                                 // 27
            var queryParamName = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];          //
                                                                                                                   //
                                                                                                                   //
            var currentQueryParams = FlowRouter.current().queryParams;                                             // 29
                                                                                                                   //
            if (routeParams === '') routeParams = FlowRouter.current().params;                                     // 31
                                                                                                                   //
            if (currentQueryParams.hasOwnProperty(queryParamName)) {                                               // 34
                currentQueryParams[queryParamName] = currentQueryParams[queryParamName] == 'ASC' ? 'DESC' : 'ASC';
            } else if (queryParamName !== '') {                                                                    //
                currentQueryParams[queryParamName] = 'ASC';                                                        // 38
            }                                                                                                      //
                                                                                                                   //
            this.reactvar.set(this.reactvar.get() === 1 ? 0 : 1);                                                  // 41
            if (!isEmpty(currentQueryParams)) {                                                                    // 42
                FlowRouter.go(FlowRouter.path(this.route, routeParams, currentQueryParams));                       // 43
            } else {                                                                                               //
                FlowRouter.go(FlowRouter.path(this.route, routeParams));                                           // 45
            }                                                                                                      //
        }                                                                                                          //
                                                                                                                   //
        return go;                                                                                                 //
    }(),                                                                                                           //
                                                                                                                   //
    getParams: function () {                                                                                       // 49
        function getParams() {                                                                                     // 49
            return FlowRouter.current().params;                                                                    // 50
        }                                                                                                          //
                                                                                                                   //
        return getParams;                                                                                          //
    }(),                                                                                                           //
                                                                                                                   //
    getQueryParams: function () {                                                                                  // 53
        function getQueryParams() {                                                                                // 53
            return FlowRouter.current().queryParams === undefined ? {} : FlowRouter.current().queryParams;         // 54
        }                                                                                                          //
                                                                                                                   //
        return getQueryParams;                                                                                     //
    }(),                                                                                                           //
    addQueryParam: function () {                                                                                   // 56
        function addQueryParam(name, value) {                                                                      // 56
                                                                                                                   //
            var params = FlowRouter.current().queryParams;                                                         // 58
            params[name] = value;                                                                                  // 59
                                                                                                                   //
            FlowRouter.setQueryParams(params);                                                                     // 61
        }                                                                                                          //
                                                                                                                   //
        return addQueryParam;                                                                                      //
    }()                                                                                                            //
};                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"invoices.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// server/invoices.js                                                                                              //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
Meteor.publish("invoiceCollection", function (filter, params) {                                                    // 1
    return invoices.byTimeRange(filter, params);                                                                   // 2
});                                                                                                                //
                                                                                                                   //
Meteor.methods({                                                                                                   // 5
    generateInvoices: function () {                                                                                // 6
        function generateInvoices() {                                                                              // 6
            var total = 100;                                                                                       // 7
            for (var i = 0; i < total; i++) {                                                                      // 8
                                                                                                                   //
                var curDate = new Date().getTime();                                                                // 10
                var lastMonthDate = new Date();                                                                    // 11
                lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);                                              // 12
                lastMonthDate = lastMonthDate.getTime();                                                           // 13
                var date = new Date(lastMonthDate + Math.random() * (curDate - lastMonthDate));                    // 14
                date.setHours(0);                                                                                  // 15
                date.setMinutes(0);                                                                                // 16
                date.setSeconds(0);                                                                                // 17
                date.setMilliseconds(0);                                                                           // 18
                                                                                                                   //
                invoices.insert({                                                                                  // 20
                    invoiceNr: Math.floor(Math.random() * (1000000 + 1)),                                          // 21
                    total: Math.floor(Math.random() * (100000 + 1)),                                               // 22
                    createdAt: date                                                                                // 23
                });                                                                                                //
            }                                                                                                      //
        }                                                                                                          //
                                                                                                                   //
        return generateInvoices;                                                                                   //
    }() });                                                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./lib/functions.js");
require("./lib/invoiceCollection.js");
require("./lib/router.js");
require("./server/invoices.js");
//# sourceMappingURL=app.js.map
