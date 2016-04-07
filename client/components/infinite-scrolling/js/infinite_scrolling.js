Template.infiniteScrolling.events({
    'becameVisible .showMoreResults'() {
        //this needs a reactive var
        this.varToIncrease.set( this.varToIncrease.get() + this.increment);
    }
});

Template.infiniteScrolling.helpers({
    'showMoreResults'() {
        return this.visibility;
    }
});

Template.infiniteScrolling.onCreated(()=> {
    this.showMoreResults= ()=> {
      const target = this.$(".showMoreResults");
      if (!target.length) return;
      let threshold = $(window).scrollTop() + $(window).height() - target.height();
      if (target.offset().top <= threshold) {
        if (!target.data("visible")) {
          this.$('.showMoreResults').trigger('becameVisible');
        }
      }
    };
    $(window).on('scroll', _.debounce(this.showMoreResults, this.debounceTimer));
});

Template.infiniteScrolling.onDestroyed(()=>{
    $(window).off('scroll', _.debounce(this.showMoreResults, this.debounceTimer));
});