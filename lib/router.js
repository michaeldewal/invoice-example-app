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
    action: function(params, queryParams) {
        Router.go({type: 'all'});
    }
});

Router = {
    route: '',
    reactvar: new ReactiveVar(0),
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

        this.reactvar.set((this.reactvar.get() === 1?0:1));
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
        return (FlowRouter.current().queryParams === undefined)?{}:FlowRouter.current().queryParams;
    },
    addQueryParam: function(name, value) {

        const params = FlowRouter.current().queryParams;
        params[name] = value;

        FlowRouter.setQueryParams(params);
    }
};