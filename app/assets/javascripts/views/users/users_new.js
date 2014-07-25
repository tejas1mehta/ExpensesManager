ExpensesManager.Views.UsersNew = Backbone.View.extend({

  template: JST['users/new'],
  
  events: {"submit form": "submit"},

  submit: function(event){
    event.preventDefault();
    var view = this;
    var params = $(event.currentTarget).serializeJSON();

    var user = new ExpensesManager.Models.User();

    user.save(params["user"],
      {success: function(resp){
        user.set({id: resp.id})
        ExpensesManager.currentUser = user;  
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
