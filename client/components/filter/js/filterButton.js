TemplateController('filterButton', {
  helpers:{
    isActive(cur, tar) {
      return cur === tar;
    }
  }
});