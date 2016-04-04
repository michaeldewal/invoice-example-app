Router.setRoute('invoices');

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});

Template.invoicesTemplate.helpers({
    invoiceData: () => {
        var react = Router.reactvar.get();
        return invoices.byTimeRange(Router.getParams().type, Router.getQueryParams());
    },
    direction: (params) => {
        if(params === undefined)
            return '';
        else if(params === 'ASC')
            return 'up';
        else
            return 'down';

    },
    moreResults: () => {
        var react = Router.reactvar.get();
        return !(invoices.find().count() < parseInt(Router.getQueryParams().limit));
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

function showMoreResults() {
    var threshold, target = $("#showMoreResults");
    if (!target.length) return;

    threshold = $(window).scrollTop() + $(window).height() - target.height();
    if (target.offset().top <= threshold) {
        if (!target.data("visible")) {
            // console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            // Either add the increased by limit to the current limit inside the URL or when no limit is set in the URL do the limit times 2
            Router.addQueryParam('limit',(Router.getQueryParams().limit !== undefined)?parseInt(Router.getQueryParams().limit)+invoices.limit_increase_by:invoices.limit_increase_by*2);
            Router.go('');
        }
    } else {
        if (target.data("visible")) {
            // console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }
}

// Check for scrolling
$(window).scroll(showMoreResults);