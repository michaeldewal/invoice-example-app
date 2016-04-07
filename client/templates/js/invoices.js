Router.setRoute('invoices');

// set default variable
Template.invoicesTemplate.limit = new ReactiveVar(invoices.limit_increase_by);

Template.registerHelper('formatDate', function (date) {
  return moment(date).format('DD-MM-YYYY');
});

Template.invoicesTemplate.helpers({
  invoiceData(){
    var react = Router.reactvar.get();
    var limit = Template.invoicesTemplate.limit.get();
    console.log('invoiceData', limit);
    Router.addQueryParam('limit', limit);
    return invoices.byTimeRange(Router.getParams().type, Router.getQueryParams());
  },
  direction(params){
    if (params === undefined)
      return '';
    else if (params === 'ASC')
      return 'up';
    else
      return 'down';

  },
  isVisible(){
    return invoices.find().count() > Session.get('');
  },
  increaseLimit() {
    const limit = Template.invoicesTemplate.limit;
    return limit;
  },
  increment() {
    return invoices.limit_increase_by;
  }
});

Template.invoicesTemplate.events({
  'click .today': function () {
    Router.go({type: 'today'});
  },
  'click .week': function () {
    Router.go({type: 'week'});
  },
  'click .month': function () {
    Router.go({type: 'month'});
  },
  'click .all': function () {
    Router.go({type: 'all'});
  },
  'click .generate': function () {
    Meteor.call('generateInvoices');
  },
  'click .filterInvoiceNr': function () {
    Router.go('', 'sortInvoiceNr');
  },
  'click .filterTotal': function () {
    Router.go('', 'sortTotal');
  },
  'click .filterCreatedAt': function () {
    Router.go('', 'sortCreatedAt');
  },
  'click .resetQuery': function () {
    Router.resetQuery();
  }
});
