var require = meteorInstall({"client":{"components":{"search":{"template":{"template.addSearchOption.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/components/search/template/template.addSearchOption.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("addSearchOption");                                                                             // 2
Template["addSearchOption"] = new Template("Template.addSearchOption", (function() {                                 // 3
  var view = this;                                                                                                   // 4
  return [ HTML.Raw('<button class="addSearchOption" value="Add Search Option">Add Search Option</button>\n    '), HTML.DIV({
    "class": "searchOptions",                                                                                        // 6
    style: "display: none"                                                                                           // 7
  }, "\n        ", HTML.Raw("<h2>Add search option by</h2>"), "\n        ", Blaze.Each(function() {                  // 8
    return Spacebars.call(view.lookup("searchAllowedData"));                                                         // 9
  }, function() {                                                                                                    // 10
    return [ "\n            ", HTML.BUTTON({                                                                         // 11
      "class": "btn",                                                                                                // 12
      name: function() {                                                                                             // 13
        return Spacebars.mustache(view.lookup("@index"));                                                            // 14
      }                                                                                                              // 15
    }, Blaze.View("lookup:name", function() {                                                                        // 16
      return Spacebars.mustache(view.lookup("name"));                                                                // 17
    })), "\n        " ];                                                                                             // 18
  }), "\n    ") ];                                                                                                   // 19
}));                                                                                                                 // 20
                                                                                                                     // 21
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.search.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/components/search/template/template.search.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("searchBoxCustom");                                                                             // 2
Template["searchBoxCustom"] = new Template("Template.searchBoxCustom", (function() {                                 // 3
  var view = this;                                                                                                   // 4
  return [ HTML.DIV({                                                                                                // 5
    "class": "searchBoxCustom"                                                                                       // 6
  }, "\n        ", HTML.FORM("\n            ", Blaze.Each(function() {                                               // 7
    return {                                                                                                         // 8
      _sequence: Spacebars.call(view.lookup("getSelectedSearchOptions")),                                            // 9
      _variable: "data"                                                                                              // 10
    };                                                                                                               // 11
  }, function() {                                                                                                    // 12
    return [ "\n            ", HTML.DIV({                                                                            // 13
      "class": "form-group"                                                                                          // 14
    }, "\n                ", Blaze._TemplateWith(function() {                                                        // 15
      return {                                                                                                       // 16
        data: Spacebars.call(view.lookup("data")),                                                                   // 17
        index: Spacebars.call(view.lookup("@index"))                                                                 // 18
      };                                                                                                             // 19
    }, function() {                                                                                                  // 20
      return Spacebars.include(view.lookupTemplate("searchField"));                                                  // 21
    }), "\n            "), "\n        " ];                                                                           // 22
  }), "\n        "), "\n    "), "\n    ", HTML.DIV({                                                                 // 23
    "class": "addSearchOptions"                                                                                      // 24
  }, "\n        ", Blaze._TemplateWith(function() {                                                                  // 25
    return {                                                                                                         // 26
      searchAllowedData: Spacebars.call(view.lookup("searchAllowedData"))                                            // 27
    };                                                                                                               // 28
  }, function() {                                                                                                    // 29
    return Spacebars.include(view.lookupTemplate("addSearchOption"));                                                // 30
  }), "\n    ") ];                                                                                                   // 31
}));                                                                                                                 // 32
                                                                                                                     // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.searchField.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/components/search/template/template.searchField.js                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("searchField");                                                                                 // 2
Template["searchField"] = new Template("Template.searchField", (function() {                                         // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "input-group"                                                                                           // 6
  }, "\n        ", Blaze.If(function() {                                                                             // 7
    return Spacebars.dataMustache(view.lookup("isFieldType"), "text", Spacebars.dot(view.lookup("data"), "type"));   // 8
  }, function() {                                                                                                    // 9
    return [ "\n            ", HTML.INPUT({                                                                          // 10
      type: "text",                                                                                                  // 11
      "class": "form-control",                                                                                       // 12
      placeholder: function() {                                                                                      // 13
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "placeholder"));                                // 14
      },                                                                                                             // 15
      name: function() {                                                                                             // 16
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "name"));                                       // 17
      }                                                                                                              // 18
    }), "\n        " ];                                                                                              // 19
  }), "\n        ", Blaze.If(function() {                                                                            // 20
    return Spacebars.dataMustache(view.lookup("isFieldType"), "number", Spacebars.dot(view.lookup("data"), "type"));
  }, function() {                                                                                                    // 22
    return [ "\n            ", HTML.INPUT({                                                                          // 23
      type: "number",                                                                                                // 24
      "class": "form-control",                                                                                       // 25
      step: function() {                                                                                             // 26
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "step"));                                       // 27
      },                                                                                                             // 28
      placeholder: function() {                                                                                      // 29
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "placeholder"));                                // 30
      },                                                                                                             // 31
      name: function() {                                                                                             // 32
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "name"));                                       // 33
      }                                                                                                              // 34
    }), "\n        " ];                                                                                              // 35
  }), "\n        ", Blaze.If(function() {                                                                            // 36
    return Spacebars.dataMustache(view.lookup("isFieldType"), "date", Spacebars.dot(view.lookup("data"), "type"));   // 37
  }, function() {                                                                                                    // 38
    return [ "\n            ", HTML.INPUT({                                                                          // 39
      type: "text",                                                                                                  // 40
      "class": "datepicker form-control",                                                                            // 41
      placeholder: function() {                                                                                      // 42
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "placeholder"));                                // 43
      },                                                                                                             // 44
      name: function() {                                                                                             // 45
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "name"));                                       // 46
      }                                                                                                              // 47
    }), "\n        " ];                                                                                              // 48
  }), "\n            ", HTML.SPAN({                                                                                  // 49
    "class": "input-group-btn"                                                                                       // 50
  }, "\n        ", HTML.BUTTON({                                                                                     // 51
    "class": "btn btn-secondary",                                                                                    // 52
    type: "button",                                                                                                  // 53
    name: function() {                                                                                               // 54
      return Spacebars.mustache(view.lookup("index"));                                                               // 55
    }                                                                                                                // 56
  }, "\n            ", HTML.Raw('<span class="glyphicon glyphicon glyphicon-remove"></span>'), "\n        "), "\n      "), "\n        ");
}));                                                                                                                 // 58
                                                                                                                     // 59
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"js":{"addSearchOption.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/components/search/js/addSearchOption.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
TemplateController('addSearchOption', {                                                                              // 1
  events: {                                                                                                          // 3
    'click .addSearchOption': function () {                                                                          // 4
      function clickAddSearchOption() {                                                                              //
        $('.searchOptions').toggle();                                                                                // 5
      }                                                                                                              //
                                                                                                                     //
      return clickAddSearchOption;                                                                                   //
    }()                                                                                                              //
  }                                                                                                                  //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"search.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/components/search/js/search.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
$(window).on('keydown', function (event) {                                                                           // 1
  if (event.keyCode === 70 && event.ctrlKey) {                                                                       // 2
    event.preventDefault();                                                                                          // 3
    $('.searchOptions').trigger('defaultSearchOption');                                                              // 4
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
var setFirstInputFocus = function setFirstInputFocus() {                                                             // 8
  $('.searchBoxCustom').find('input').first().focus();                                                               // 9
};                                                                                                                   //
                                                                                                                     //
TemplateController('searchBoxCustom', {                                                                              // 12
  state: {                                                                                                           // 14
    searchConfig: []                                                                                                 // 15
  },                                                                                                                 //
  events: {                                                                                                          // 17
    'click .searchOptions .btn': function () {                                                                       // 18
      function clickSearchOptionsBtn(e) {                                                                            //
        var data = this.data.searchAllowedData[e.currentTarget.name];                                                // 19
        var config = this.state.searchConfig();                                                                      // 20
        config.push(data);                                                                                           // 21
        this.state.searchConfig(config);                                                                             // 22
        Meteor.setTimeout(setFirstInputFocus, 100);                                                                  // 23
      }                                                                                                              //
                                                                                                                     //
      return clickSearchOptionsBtn;                                                                                  //
    }(),                                                                                                             //
    'click .addSearchOption': function () {                                                                          // 25
      function clickAddSearchOption() {                                                                              //
        $('#searchOptions').toggle();                                                                                // 26
      }                                                                                                              //
                                                                                                                     //
      return clickAddSearchOption;                                                                                   //
    }(),                                                                                                             //
    'removeSearchOption': function () {                                                                              // 28
      function removeSearchOption(event, tpl, index) {                                                               //
        var config = this.state.searchConfig();                                                                      // 29
        if (undefined !== config[index]) {                                                                           // 30
          config.splice(index, 1);                                                                                   // 31
        }                                                                                                            //
        this.state.searchConfig(config);                                                                             // 33
        Meteor.setTimeout(setFirstInputFocus, 100);                                                                  // 34
      }                                                                                                              //
                                                                                                                     //
      return removeSearchOption;                                                                                     //
    }(),                                                                                                             //
    'defaultSearchOption .searchOptions': function () {                                                              // 36
      function defaultSearchOptionSearchOptions() {                                                                  //
        var data = this.data.searchAllowedData[0];                                                                   // 37
        var config = this.state.searchConfig();                                                                      // 38
        config.push(data);                                                                                           // 39
        this.state.searchConfig(config);                                                                             // 40
        Meteor.setTimeout(setFirstInputFocus, 100);                                                                  // 41
      }                                                                                                              //
                                                                                                                     //
      return defaultSearchOptionSearchOptions;                                                                       //
    }(),                                                                                                             //
    'keydown .searchBoxCustom input': function () {                                                                  // 43
      function keydownSearchBoxCustomInput(e) {                                                                      //
        var _this = this;                                                                                            //
                                                                                                                     //
        if (e.keyCode === 13) {                                                                                      // 44
          (function () {                                                                                             //
            var filter = [];                                                                                         // 45
            $('.searchBoxCustom').find('input').each(function () {                                                   // 46
              filter.push({ name: this.name, value: this.value, type: this.type });                                  // 47
            });                                                                                                      //
            //dirty solution for now                                                                                 //
            _this.$(_this.firstNode).trigger(_this.data.eventName, { filter: filter });                              // 50
          })();                                                                                                      //
        }                                                                                                            //
      }                                                                                                              //
                                                                                                                     //
      return keydownSearchBoxCustomInput;                                                                            //
    }(),                                                                                                             //
    'submit form': function () {                                                                                     // 53
      function submitForm(event) {                                                                                   //
        event.preventDefault();                                                                                      // 54
      }                                                                                                              //
                                                                                                                     //
      return submitForm;                                                                                             //
    }()                                                                                                              //
  },                                                                                                                 //
  helpers: {                                                                                                         // 57
    getSelectedSearchOptions: function () {                                                                          // 58
      function getSelectedSearchOptions() {                                                                          //
        return this.state.searchConfig();                                                                            // 59
      }                                                                                                              //
                                                                                                                     //
      return getSelectedSearchOptions;                                                                               //
    }()                                                                                                              //
  }                                                                                                                  //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"searchField.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/components/search/js/searchField.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
TemplateController('searchField', {                                                                                  // 1
  helpers: {                                                                                                         // 3
    isFieldType: function () {                                                                                       // 4
      function isFieldType(type, dataType) {                                                                         //
        return type === dataType;                                                                                    // 5
      }                                                                                                              //
                                                                                                                     //
      return isFieldType;                                                                                            //
    }()                                                                                                              //
  },                                                                                                                 //
  events: {                                                                                                          // 8
    'click .btn': function () {                                                                                      // 9
      function clickBtn(e) {                                                                                         //
        this.triggerEvent('removeSearchOption', e.currentTarget.name);                                               // 10
      }                                                                                                              //
                                                                                                                     //
      return clickBtn;                                                                                               //
    }()                                                                                                              //
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.searchField.onRendered(function () {                                                                        // 15
                                                                                                                     //
  $(".datepicker").datepicker({                                                                                      // 17
    format: "yyyy/mm/dd",                                                                                            // 18
    autoclose: true,                                                                                                 // 19
    multidate: true,                                                                                                 // 20
    multidateSeparator: ",",                                                                                         // 21
    calendarWeeks: true                                                                                              // 22
  });                                                                                                                //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"templates":{"html":{"template.invoice.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/html/template.invoice.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("invoiceTemplate");                                                                             // 2
Template["invoiceTemplate"] = new Template("Template.invoiceTemplate", (function() {                                 // 3
  var view = this;                                                                                                   // 4
  return HTML.TR("\n        ", HTML.TD(Blaze.View("lookup:invoiceNr", function() {                                   // 5
    return Spacebars.mustache(view.lookup("invoiceNr"));                                                             // 6
  })), "\n        ", HTML.TD(Blaze.View("lookup:total", function() {                                                 // 7
    return Spacebars.mustache(view.lookup("total"));                                                                 // 8
  })), "\n        ", HTML.TD(Blaze.View("lookup:formatDate", function() {                                            // 9
    return Spacebars.mustache(view.lookup("formatDate"), view.lookup("createdAt"));                                  // 10
  })), "\n    ");                                                                                                    // 11
}));                                                                                                                 // 12
                                                                                                                     // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.invoices.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/html/template.invoices.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("invoicesTemplate");                                                                            // 2
Template["invoicesTemplate"] = new Template("Template.invoicesTemplate", (function() {                               // 3
  var view = this;                                                                                                   // 4
  return [ HTML.Raw('<div class="container">\n        <h1>Invoices</h1>\n    </div>\n    <button type="button" name="today" class="btn btn-filter today btn-default">Today</button>\n    <button type="button" name="week" class="btn btn-filter week btn-default">Week</button>\n    <button type="button" name="month" class="btn btn-filter month btn-default">Month</button>\n    <button type="button" name="all" class="btn btn-filter all btn-default">All</button>\n    <button type="button" class="btn generate btn-info">GENERATE</button>\n    <button type="button" class="btn resetQuery btn-warning">Reset Filters</button>\n    '), Blaze._TemplateWith(function() {
    return {                                                                                                         // 6
      searchAllowedData: Spacebars.call(view.lookup("searchAllowedData")),                                           // 7
      eventName: Spacebars.call("parseSearchFilter")                                                                 // 8
    };                                                                                                               // 9
  }, function() {                                                                                                    // 10
    return Spacebars.include(view.lookupTemplate("searchBoxCustom"));                                                // 11
  }), "\n    ", HTML.TABLE({                                                                                         // 12
    "class": "table table-striped"                                                                                   // 13
  }, "\n        ", HTML.THEAD("\n        ", HTML.TR("\n            ", HTML.TH({                                      // 14
    "class": "sort",                                                                                                 // 15
    name: "sortInvoiceNr"                                                                                            // 16
  }, "Invoice Nr.", HTML.SPAN({                                                                                      // 17
    "class": function() {                                                                                            // 18
      return [ "glyphicon glyphicon-chevron-", Spacebars.mustache(view.lookup("direction"), Spacebars.dot(view.lookup("queryParams"), "sortInvoiceNr")) ];
    }                                                                                                                // 20
  })), "\n            ", HTML.TH({                                                                                   // 21
    "class": "sort",                                                                                                 // 22
    name: "sortTotal"                                                                                                // 23
  }, "total", HTML.SPAN({                                                                                            // 24
    "class": function() {                                                                                            // 25
      return [ "glyphicon glyphicon-chevron-", Spacebars.mustache(view.lookup("direction"), Spacebars.dot(view.lookup("queryParams"), "sortTotal")) ];
    }                                                                                                                // 27
  })), "\n            ", HTML.TH({                                                                                   // 28
    "class": "sort",                                                                                                 // 29
    name: "sortCreatedAt"                                                                                            // 30
  }, "createdAt", HTML.SPAN({                                                                                        // 31
    "class": function() {                                                                                            // 32
      return [ "glyphicon glyphicon-chevron-", Spacebars.mustache(view.lookup("direction"), Spacebars.dot(view.lookup("queryParams"), "sortCreatedAt")) ];
    }                                                                                                                // 34
  })), "\n        "), "\n        "), "\n        ", HTML.TBODY("\n            ", Blaze.Each(function() {              // 35
    return Spacebars.call(view.lookup("invoiceData"));                                                               // 36
  }, function() {                                                                                                    // 37
    return [ "\n                ", Spacebars.include(view.lookupTemplate("invoiceTemplate")), "\n            " ];    // 38
  }), "\n        "), "\n    ") ];                                                                                    // 39
}));                                                                                                                 // 40
                                                                                                                     // 41
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"js":{"invoices.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client/templates/js/invoices.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Router.setRoute('invoices');                                                                                         // 1
                                                                                                                     //
TemplateController('invoicesTemplate', {                                                                             // 3
  helpers: {                                                                                                         // 4
    invoiceData: function () {                                                                                       // 5
      function invoiceData() {                                                                                       //
        var react = Router.reactvar.get();                                                                           // 6
        return invoices.byTimeRange(Router.getParams().type, Router.getQueryParams());                               // 7
      }                                                                                                              //
                                                                                                                     //
      return invoiceData;                                                                                            //
    }(),                                                                                                             //
    direction: function () {                                                                                         // 9
      function direction(params) {                                                                                   //
        if (params === undefined) return '';else if (params === 'ASC') return 'up';else return 'down';               // 10
      }                                                                                                              //
                                                                                                                     //
      return direction;                                                                                              //
    }(),                                                                                                             //
    searchAllowedData: function () {                                                                                 // 18
      function searchAllowedData() {                                                                                 //
        return [{                                                                                                    // 19
          name: 'invoiceNr',                                                                                         // 21
          type: 'number',                                                                                            // 22
          step: 1,                                                                                                   // 23
          placeholder: 'Invoice Number'                                                                              // 24
        }, {                                                                                                         //
          name: 'total',                                                                                             // 26
          type: 'number',                                                                                            // 27
          step: 1,                                                                                                   // 28
          placeholder: 'Total'                                                                                       // 29
        }, {                                                                                                         //
          name: 'date',                                                                                              // 31
          type: 'date',                                                                                              // 32
          placeholder: 'Select or type a date'                                                                       // 33
        }, {                                                                                                         //
          name: 'email',                                                                                             // 35
          type: 'text',                                                                                              // 36
          placeholder: 'Email address'                                                                               // 37
        }];                                                                                                          //
      }                                                                                                              //
                                                                                                                     //
      return searchAllowedData;                                                                                      //
    }()                                                                                                              //
  },                                                                                                                 //
  events: {                                                                                                          // 42
    'click .btn-filter': function () {                                                                               // 43
      function clickBtnFilter(e) {                                                                                   //
        Router.go({ type: e.currentTarget.name });                                                                   // 44
      }                                                                                                              //
                                                                                                                     //
      return clickBtnFilter;                                                                                         //
    }(),                                                                                                             //
    'click .generate': function () {                                                                                 // 46
      function clickGenerate() {                                                                                     //
        Meteor.call('generateInvoices');                                                                             // 47
      }                                                                                                              //
                                                                                                                     //
      return clickGenerate;                                                                                          //
    }(),                                                                                                             //
    'click .sort': function () {                                                                                     // 49
      function clickSort(e) {                                                                                        //
        Router.go('', e.currentTarget.name);                                                                         // 50
      }                                                                                                              //
                                                                                                                     //
      return clickSort;                                                                                              //
    }(),                                                                                                             //
    'click .resetQuery': function () {                                                                               // 52
      function clickResetQuery() {                                                                                   //
        Router.resetQuery();                                                                                         // 53
      }                                                                                                              //
                                                                                                                     //
      return clickResetQuery;                                                                                        //
    }(),                                                                                                             //
    'parseSearchFilter': function () {                                                                               // 55
      function parseSearchFilter(e, tpl, args) {                                                                     //
        args.filter.forEach(function (v) {                                                                           // 56
          Router.addQueryParam('filter' + v.name, v.value);                                                          // 57
        });                                                                                                          //
        Router.go('');                                                                                               // 59
      }                                                                                                              //
                                                                                                                     //
      return parseSearchFilter;                                                                                      //
    }()                                                                                                              //
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.registerHelper('formatDate', function (date) {                                                              // 64
  return moment(date).format('DD-MM-YYYY');                                                                          // 65
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"lib":{"functions.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/functions.js                                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
String.prototype.firstToType = function () {                                                                         // 1
    var type = arguments.length <= 0 || arguments[0] === undefined ? 'lower' : arguments[0];                         //
                                                                                                                     //
    switch (type) {                                                                                                  // 2
        case 'lower':                                                                                                // 3
            return this.charAt(0).toLowerCase() + this.slice(1);                                                     // 4
            break;                                                                                                   // 5
        case 'upper':                                                                                                // 2
            return this.charAt(0).toUpperCase() + this.slice(1);                                                     // 7
            break;                                                                                                   // 8
    }                                                                                                                // 2
};                                                                                                                   //
                                                                                                                     //
isEmpty = function isEmpty(obj) {                                                                                    // 12
    return Object.getOwnPropertyNames(obj).length === 0;                                                             // 13
};                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"invoiceCollection.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/invoiceCollection.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
invoices = new Mongo.Collection("invoices");                                                                         // 1
invoices.limit_results_by = 50;                                                                                      // 2
invoices.limit_increase_by = 50;                                                                                     // 3
invoices.byTimeRange = function () {                                                                                 // 4
  var timeRange = arguments.length <= 0 || arguments[0] === undefined ? "today" : arguments[0];                      //
  var queryParams = arguments[1];                                                                                    //
                                                                                                                     //
  var limit = invoices.limit_results_by;                                                                             // 5
                                                                                                                     //
  if (queryParams !== undefined && queryParams.hasOwnProperty('limit')) {                                            // 7
    limit = parseInt(queryParams.limit);                                                                             // 8
    delete queryParams['limit'];                                                                                     // 9
  }                                                                                                                  //
                                                                                                                     //
  queryParams = isEmpty(queryParams) ? { sortCreatedAt: "DESC", sortTotal: "ASC" } : queryParams;                    // 12
                                                                                                                     //
  console.log(queryParams);                                                                                          // 14
  var sort = {};                                                                                                     // 15
  var filter = {};                                                                                                   // 16
  for (var k in meteorBabelHelpers.sanitizeForInObject(queryParams)) {                                               // 17
    console.log('k', k);                                                                                             // 18
    if (k.indexOf('sort') > -1) {                                                                                    // 19
      sort[k.replace('sort', '').firstToType('lower')] = queryParams[k] === 'DESC' ? -1 : 1;                         // 20
    } else if (k.indexOf('filter') > -1) {                                                                           //
      if (!isNaN(parseInt(queryParams[k])) && queryParams[k] !== "") {                                               // 22
        filter[k.replace('filter', '').firstToType('lower')] = isNaN(parseInt(queryParams[k])) ? queryParams[k] : parseInt(queryParams[k]);
      }                                                                                                              //
    }                                                                                                                //
  }                                                                                                                  //
                                                                                                                     //
  var getTimeRange = function getTimeRange(timeRange) {                                                              // 28
    var _today = new Date();                                                                                         // 29
    var timeRanges = {                                                                                               // 30
      today: function () {                                                                                           // 31
        function today() {                                                                                           //
          _today.setSeconds(0);                                                                                      // 32
          _today.setMinutes(0);                                                                                      // 33
          _today.setHours(0);                                                                                        // 34
          return _today;                                                                                             // 35
        }                                                                                                            //
                                                                                                                     //
        return today;                                                                                                //
      }(),                                                                                                           //
      week: function () {                                                                                            // 37
        function week() {                                                                                            //
          return new Date(_today.getFullYear(), _today.getMonth(), _today.getDate() - 7);                            // 38
        }                                                                                                            //
                                                                                                                     //
        return week;                                                                                                 //
      }(),                                                                                                           //
      month: function () {                                                                                           // 40
        function month() {                                                                                           //
          return new Date(_today.getFullYear(), _today.getMonth() - 1, _today.getDate());                            // 41
        }                                                                                                            //
                                                                                                                     //
        return month;                                                                                                //
      }(),                                                                                                           //
      all: function () {                                                                                             // 43
        function all() {                                                                                             //
          return false;                                                                                              // 44
        }                                                                                                            //
                                                                                                                     //
        return all;                                                                                                  //
      }()                                                                                                            //
    };                                                                                                               //
                                                                                                                     //
    if (timeRanges[timeRange]) {                                                                                     // 48
      return timeRanges[timeRange]();                                                                                // 49
    } else {                                                                                                         //
      return timeRanges['today']();                                                                                  // 51
    }                                                                                                                //
  };                                                                                                                 //
                                                                                                                     //
  var selectedDate = getTimeRange(timeRange);                                                                        // 55
                                                                                                                     //
  if (selectedDate !== false) filter.createdAt = { '$gte': selectedDate };                                           // 58
  console.log(filter);                                                                                               // 59
  return invoices.find(filter, { sort: sort });                                                                      // 60
};                                                                                                                   //
                                                                                                                     //
/*                                                                                                                   //
TODO implement this                                                                                                  //
                                                                                                                     //
invoices.createFilter = function(params){                                                                            //
  let fn;                                                                                                            //
  const typeCaster = function(type, variable) {                                                                      //
    const types = {                                                                                                  //
      text(v) {                                                                                                      //
        return v;                                                                                                    //
      },                                                                                                             //
      number(v) {                                                                                                    //
        return parseInt(v);                                                                                          //
      },                                                                                                             //
      date(v) {                                                                                                      //
        return new Date(v);                                                                                          //
      }                                                                                                              //
    };                                                                                                               //
    if(types[type]) {                                                                                                //
      return types[type](variable);                                                                                  //
    } else {                                                                                                         //
      return types['text'](variable);                                                                                //
    }                                                                                                                //
  };                                                                                                                 //
  let filter = {};                                                                                                   //
  params.forEach(function(param){                                                                                    //
    filter[param.name] = typeCaster(params.type, params,value);                                                      //
  });                                                                                                                //
                                                                                                                     //
  console.log(filter);                                                                                               //
};                                                                                                                   //
  */                                                                                                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/router.js                                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
FlowRouter.route("/:type", {                                                                                         // 1
    name: "invoices",                                                                                                // 2
    subscriptions: function () {                                                                                     // 3
        function subscriptions(params, queryParams) {                                                                // 3
            this.register("invoiceCollection", Meteor.subscribe("invoiceCollection", params.type, queryParams));     // 4
        }                                                                                                            //
                                                                                                                     //
        return subscriptions;                                                                                        //
    }(),                                                                                                             //
    action: function () {                                                                                            // 6
        function action(params, queryParams) {                                                                       // 6
            BlazeLayout.render("invoicesTemplate");                                                                  // 7
        }                                                                                                            //
                                                                                                                     //
        return action;                                                                                               //
    }()                                                                                                              //
});                                                                                                                  //
FlowRouter.route("/", {                                                                                              // 10
    action: function () {                                                                                            // 11
        function action(params, queryParams) {                                                                       // 11
            Router.go({ type: 'all' });                                                                              // 12
        }                                                                                                            //
                                                                                                                     //
        return action;                                                                                               //
    }()                                                                                                              //
});                                                                                                                  //
                                                                                                                     //
Router = {                                                                                                           // 16
    route: '',                                                                                                       // 17
    reactvar: new ReactiveVar(0),                                                                                    // 18
    setRoute: function () {                                                                                          // 19
        function setRoute(routeName) {                                                                               // 19
            this.route = routeName;                                                                                  // 20
        }                                                                                                            //
                                                                                                                     //
        return setRoute;                                                                                             //
    }(),                                                                                                             //
                                                                                                                     //
    resetQuery: function () {                                                                                        // 23
        function resetQuery() {                                                                                      // 23
            FlowRouter.go(FlowRouter.path(this.route, FlowRouter.current().params));                                 // 24
        }                                                                                                            //
                                                                                                                     //
        return resetQuery;                                                                                           //
    }(),                                                                                                             //
                                                                                                                     //
    go: function () {                                                                                                // 27
        function go(routeParams) {                                                                                   // 27
            var queryParamName = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];            //
                                                                                                                     //
                                                                                                                     //
            var currentQueryParams = FlowRouter.current().queryParams;                                               // 29
                                                                                                                     //
            if (routeParams === '') routeParams = FlowRouter.current().params;                                       // 31
                                                                                                                     //
            if (currentQueryParams.hasOwnProperty(queryParamName)) {                                                 // 34
                currentQueryParams[queryParamName] = currentQueryParams[queryParamName] == 'ASC' ? 'DESC' : 'ASC';   // 35
            } else if (queryParamName !== '') {                                                                      //
                currentQueryParams[queryParamName] = 'ASC';                                                          // 38
            }                                                                                                        //
                                                                                                                     //
            this.reactvar.set(this.reactvar.get() === 1 ? 0 : 1);                                                    // 41
            if (!isEmpty(currentQueryParams)) {                                                                      // 42
                FlowRouter.go(FlowRouter.path(this.route, routeParams, currentQueryParams));                         // 43
            } else {                                                                                                 //
                FlowRouter.go(FlowRouter.path(this.route, routeParams));                                             // 45
            }                                                                                                        //
        }                                                                                                            //
                                                                                                                     //
        return go;                                                                                                   //
    }(),                                                                                                             //
                                                                                                                     //
    getParams: function () {                                                                                         // 49
        function getParams() {                                                                                       // 49
            return FlowRouter.current().params;                                                                      // 50
        }                                                                                                            //
                                                                                                                     //
        return getParams;                                                                                            //
    }(),                                                                                                             //
                                                                                                                     //
    getQueryParams: function () {                                                                                    // 53
        function getQueryParams() {                                                                                  // 53
            return FlowRouter.current().queryParams === undefined ? {} : FlowRouter.current().queryParams;           // 54
        }                                                                                                            //
                                                                                                                     //
        return getQueryParams;                                                                                       //
    }(),                                                                                                             //
    addQueryParam: function () {                                                                                     // 56
        function addQueryParam(name, value) {                                                                        // 56
                                                                                                                     //
            var params = FlowRouter.current().queryParams;                                                           // 58
            params[name] = value;                                                                                    // 59
                                                                                                                     //
            FlowRouter.setQueryParams(params);                                                                       // 61
        }                                                                                                            //
                                                                                                                     //
        return addQueryParam;                                                                                        //
    }()                                                                                                              //
};                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/components/search/template/template.addSearchOption.js");
require("./client/components/search/template/template.search.js");
require("./client/components/search/template/template.searchField.js");
require("./client/templates/html/template.invoice.js");
require("./client/templates/html/template.invoices.js");
require("./lib/functions.js");
require("./lib/invoiceCollection.js");
require("./lib/router.js");
require("./client/components/search/js/addSearchOption.js");
require("./client/components/search/js/search.js");
require("./client/components/search/js/searchField.js");
require("./client/templates/js/invoices.js");