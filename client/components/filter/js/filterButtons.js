TemplateController('filterButtons', {
  events:{
    'click .filter-buttons .btn'(e){
      this.triggerEvent("clickFilterButton", e);
    }
  }
});