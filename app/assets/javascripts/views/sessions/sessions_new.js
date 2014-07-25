ExpensesManager.Views.SessionsNew = Backbone.View.extend({

  template: JST['sessions/new'],
  events: {"submit form": "submit"},

  submit: function(event){
    event.preventDefault();
    var view = this;
    var params = $(event.currentTarget).serializeJSON();

    var session = new ExpensesManager.Models.Session(params["user"]);

    session.save({},
      {success: function(resp){
        ExpensesManager.currentUser = new ExpensesManager.Models.User(resp.attributes);
        ExpensesManager.addNavbar()
        Backbone.history.navigate("#expenses/index", { trigger: true });        
      }}
    )

  },

  render: function(){
    renderedContent = this.template();
    this.$el.html(renderedContent)
    return this
  }

});
