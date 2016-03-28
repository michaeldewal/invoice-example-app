Meteor.startup(function(){
    invoices.initialize();
});

invoices = new Mongo.Collection("invoices");
invoices.byTimeRange = function() {
    const timeRange = FlowRouter.getParam('type') || 'all';
    const sortParams = FlowRouter.current().queryParams;
    const sort = {};
    for (let k in sortParams) {
        sort[k.replace('sort', '').firstToType('lower')] = (sortParams[k] === 'DESC')?-1:1;
    }

    let selectedDate;
    const today = new Date();
    switch(timeRange) {
        case 'today':
            selectedDate = today;
            selectedDate.setSeconds(0);
            selectedDate.setHours(0);
            selectedDate.setMinutes(0);
            break;
        case 'week':
            selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            break;
        case 'month':
            selectedDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            break;
        default:
            selectedDate = false;
            break;
    }

    const filter = (selectedDate !== false)?{ createdAt: { '$gte': selectedDate }}:{};

    Session.set("invoiceFilter", filter);
    Session.set("invoiceSort", sort);
};

invoices.goRoute = function(route) {
    const param = FlowRouter.getQueryParam(route);
    const params = FlowRouter.current().queryParams;
    params[route] = (param && param === 'ASC')?'DESC':'ASC';
    FlowRouter.go('/:type', FlowRouter.current().params, params);
    invoices.byTimeRange();
};

invoices.initialize = function() {
    if(!FlowRouter.getParam('type') && FlowRouter.current().params == {})
        FlowRouter.setQueryParams({sortCreatedAt: 'DESC', sortTotal: 'ASC'});
    invoices.byTimeRange();
};

Template.invoicestemplate.helpers({
    invoices: function() {
        const filter = Session.get("invoiceFilter") || {};
        const sort = Session.get("invoiceSort") || false;

        Meteor.subscribe("invoiceCollection", filter, sort);
        if(sort) {
            return invoices.find(filter, {sort: sort});
        }

        return invoices.find(filter);
    }
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});

Template.invoicestemplate.events({
    'click .today': function() {
        FlowRouter.go('/today');
        invoices.byTimeRange();
    },
    'click .week': function() {
        FlowRouter.go('/week');
        invoices.byTimeRange();
    },
    'click .month': function() {
        FlowRouter.go('/month');
        invoices.byTimeRange();
    },
    'click .all': function() {
        FlowRouter.go('/');
        invoices.byTimeRange();
    },
    'click .generate': function() {
        Meteor.call('generateInvoices');
    },
    'click .filterInvoiceNr': function() {
        invoices.goRoute('sortInvoiceNr');
    },
    'click .filterTotal': function() {
        invoices.goRoute('sortTotal');
    },
    'click .filterCreatedAt': function() {
        invoices.goRoute('sortCreatedAt');
    }
});