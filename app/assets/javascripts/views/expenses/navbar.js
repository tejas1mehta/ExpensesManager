ExpensesManager.Views.Navbar = Backbone.View.extend({

  template: JST['expenses/navbar'],

  render: function(){
    renderedContent = this.template({});
    this.$el.html(renderedContent)
    return this
  }

});
