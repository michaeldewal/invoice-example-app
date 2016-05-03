TemplateController('addSearchOption',
  {
    events: {
      'click .addSearchOption'() {
        $('.searchOptions').toggle();
      }
    }
  }
);