Router.setRoute('invoices');
const LIMIT_INCREASE = 50;

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});

Template.invoicesTemplate.helpers({
    invoiceData: function() {
        return invoices.byTimeRange(Router.getParams().type, Router.getQueryParams());
    },
    direction: function(params) {
        if(params === undefined)
            return '';
        else if(params === 'ASC')
            return 'up';
        else
            return 'down';

    }
});

Template.invoicesTemplate.events({
    'click .today': function() {
        Router.go({type: 'today'});
    },
    'click .week': function() {
        Router.go({type: 'week'});
    },
    'click .month': function() {
        Router.go({type: 'month'});
    },
    'click .all': function() {
        Router.go({type: 'all'});
    },
    'click .generate': function() {
        Meteor.call('generateInvoices');
    },
    'click .filterInvoiceNr': function() {
        Router.go('', 'sortInvoiceNr');
    },
    'click .filterTotal': function() {
        Router.go('', 'sortTotal');
    },
    'click .filterCreatedAt': function() {
        Router.go('', 'sortCreatedAt');
    },
    'click .resetQuery': function() {
        Router.resetQuery();
    }
});

// Check for scrolling
$(window).scroll();