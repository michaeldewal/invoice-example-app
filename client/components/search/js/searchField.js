TemplateController('searchField',
  {
    state: {
      selectedDate: "0000-00-00"
    },
    helpers: {
      isFieldType(type, dataType) {
        return type === dataType;
      }
    },
    events: {
      'click .btn'(e) {
        this.triggerEvent('removeSearchOption', e.currentTarget.name);
      },
      'change input.datepicker'(e) {
        const selectedDate = e.currentTarget.value;
        if(!isNaN(Date.parse(e.currentTarget.value)) && this.state.selectedDate !== e.currentTarget.value && e.currentTarget.value.length === 10) {
          this.state.selectedDate = selectedDate;

          const e = jQuery.Event("keyup");
          e.keycode = 13;
          e.which = 13;
          $('input.datepicker').trigger(e);
        }
      }
    }
  });

Template.searchField.onRendered(()=>{
  this.$( ".datepicker" ).datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    calendarWeeks: true
  });
});
