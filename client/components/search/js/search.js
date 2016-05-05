$(window).on('keydown', function(event) {
  if(event.keyCode === 70 && event.ctrlKey) {
    event.preventDefault();
    $('.searchOptions').trigger('defaultSearchOption');
  }
});

let setFirstInputFocus = function() {
  $('.searchBoxCustom').find('input').first().focus();
};

TemplateController('searchBoxCustom',
  {
    state: {
      searchConfig: []
    },
    events: {
      'click .searchOptions .btn'(e) {
        const data = this.data.searchAllowedData[e.currentTarget.name];
        const config = this.state.searchConfig();
        config.push(data);
        this.state.searchConfig(config);
        Meteor.setTimeout(setFirstInputFocus, 100);
      },
      'click .addSearchOption'() {
        $('#searchOptions').toggle();
      },
      'removeSearchOption'(event, tpl, index) {
        const config = this.state.searchConfig();
        if(undefined !== config[index]) {
          config.splice(index, 1);
        }
        this.state.searchConfig(config);
        Meteor.setTimeout(setFirstInputFocus, 100);
      },
      'defaultSearchOption .searchOptions'(){
        const data = this.data.searchAllowedData[0];
        const config = this.state.searchConfig();
        if(config.length === 0) {
          config.push(data);
          this.state.searchConfig(config);
        }
        Meteor.setTimeout(setFirstInputFocus, 100);
      },
      'keyup .searchBoxCustom input'(e){
        if((e.keyCode || e.which) === 13 || e.type === 'submit'){
          let filter = [];
          $('.searchBoxCustom').find('input').each(function(){
            filter.push({name: this.name, value: this.value, type: this.type});
          });
          //dirty solution for now
          this.$(this.firstNode).trigger(this.data.eventName, {filter: filter});
        }
      },
      'submit form'(event){
        event.preventDefault();
      }
    },
    helpers: {
      getSelectedSearchOptions() {
        return this.state.searchConfig();
      }
    }
  }
);