Router.setRoute('invoices');

TemplateController('invoicesTemplate', {
  helpers:{
    invoiceData(){
      var react = Router.reactvar.get();
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
    searchAllowedData() {
      return [
        {
          name: 'invoiceNr',
          type: 'number',
          step: 1,
          placeholder: 'Invoice Number'
        },{
          name: 'total',
          type: 'number',
          step: 1,
          placeholder: 'Total'
        },{
          name: 'date',
          type: 'date',
          placeholder: 'Select or type a date'
        },{
          name: 'email',
          type: 'text',
          placeholder: 'Email address'
        }
      ];
    }
  },
  events: {
    'click .btn-filter'(e) {
      Router.go({type: e.currentTarget.name});
    },
    'click .generate'() {
      Meteor.call('generateInvoices');
    },
    'click .sort'(e) {
      Router.go('', e.currentTarget.dataset.name);
    },
    'click .resetQuery'() {
      Router.resetQuery();
    },
    'parseSearchFilter'(e, tpl, args) {
      args.filter.forEach(function(v){
        Router.addQueryParam('filter'+v.name, v.value);
      });
      Router.go('');
    }
  }
});

Template.registerHelper('formatDate', function (date) {
  return moment(date).format('DD-MM-YYYY');
});