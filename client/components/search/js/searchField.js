TemplateController('searchField',
  {
    helpers: {
      isFieldType(type, dataType) {
        return type === dataType;
      }
    },
    events: {
      'click .btn'(e) {
        this.triggerEvent('removeSearchOption', e.currentTarget.name);
      }
    }
  });

Template.searchField.onRendered(()=>{

  $( ".datepicker" ).datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    calendarWeeks: true
  });
});
