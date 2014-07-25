ExpensesManager.Views.ExpensesNew = Backbone.View.extend({

  template: JST['expenses/new'],

  events: {"submit #submit_expense": "submitExpense"},
  
  submitExpense: function(event){
    event.preventDefault()
    var view = this;
    var params = $(event.currentTarget).serializeJSON();

    var newExpense = new ExpensesManager.Models.Expense()
    newExpense.save(params["expense"],
      {
        success: function(resp){
          newExpense.set({id: resp.id})
          ExpensesManager.allExpenses.add(newExpense)
          Backbone.history.navigate("expenses/index", { trigger: true });
        }
      }
    )
  },

  render: function(){
    renderedContent = this.template();
    this.$el.html(renderedContent)
    return this
  }

});
