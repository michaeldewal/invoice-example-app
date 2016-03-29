FlowRouter.route("/:type", {
    name: "invoices",
    subscriptions: function(params, queryParams) {
            this.register("invoiceCollection", Meteor.subscribe("invoiceCollection", params.type, queryParams));
    },
    action: function(params, queryParams) {
        BlazeLayout.render("invoicesTemplate");
    }
});
FlowRouter.route("/", {
    subscriptions: function(params, queryParams) {
        this.register("invoiceCollection", Meteor.subscribe("invoiceCollection"));
    },
    action: function(params, queryParams) {
        BlazeLayout.render("invoicesTemplate");
    }
});

Router = {
    route: '',
    setRoute: function(routeName) {
        this.route = routeName;
    },

    resetQuery: function() {
        FlowRouter.go(FlowRouter.path(this.route, FlowRouter.current().params));
    },

    go: function(routeParams, queryParamName = '') {

        const currentQueryParams = FlowRouter.current().queryParams;
        
        if(routeParams === '')
            routeParams = FlowRouter.current().params;

        if(currentQueryParams.hasOwnProperty(queryParamName)) {
            currentQueryParams[queryParamName] = (currentQueryParams[queryParamName] == 'ASC')?'DESC':'ASC'
        } else if(queryParamName !== '')
        {
            currentQueryParams[queryParamName] = 'ASC';
        }

        if(!isEmpty(currentQueryParams)) {
            FlowRouter.go(FlowRouter.path(this.route, routeParams, currentQueryParams));
        } else {
            FlowRouter.go(FlowRouter.path(this.route, routeParams));
        }
    },

    getParams: function() {
        return FlowRouter.current().params;
    },

    getQueryParams: function() {
        return FlowRouter.current().queryParams;
    },
    addQueryParam: function(name, value) {

        const params = FlowRouter.current().queryParams;
        params[name] = value;

        FlowRouter.setQueryParams(params);
    }
};