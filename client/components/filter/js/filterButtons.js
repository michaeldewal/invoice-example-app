TemplateController('filterButtons', {
  events:{
    'click .filter-buttons .btn'(e){
      this.triggerEvent(this.data.eventName, e);
    }
  }
});