ExpensesManager.Views.ExpensesIndex = Backbone.View.extend({

  template: JST['expenses/index'],

  initialize: function(){
    this.editExpenses = {};
    var view = this;
    view.filterData = false;
    this.showData = this.collection;
    this.collection.forEach(function(expense){
       view.editExpenses[expense.get("id")] = false
    })
  },
  
  events:{
    "click #edit" : "editExpense",
    "submit #update" : "updateExpense",
    "click #delete" : "deleteExpense",
    "submit #filter_date" : "getFilteredData",
    "submit #filter_form" : "filterData"
  },

  filterData: function(event){
    event.preventDefault()
    this.filterData = true;
    this.render()
  },

  getFilteredData: function(event){
    event.preventDefault()
    this.filterData = false;
    var params = $(event.currentTarget).serializeJSON();
    console.log(params["start_date"])

    filteredDataByDate = this.collection.filteredByDate(params["start_date"], params["end_date"])
    filteredDataByDateAmt = filteredDataByDate.filteredByAmount(params["min_amt"], params["max_amt"])
    this.showData = filteredDataByDateAmt
    console.log(this.showData)
    this.render()    
  },

  editExpense: function(event){
    event.preventDefault()
    var expenseID = parseInt($(event.currentTarget).attr("data-id"));
    this.editExpenses[expenseID] = true
    this.render()
  },

  updateExpense: function(event){
    event.preventDefault()
    var expenseID = parseInt($(event.currentTarget).attr("data-id"));
    updatingExpense = this.collection.get(expenseID);
    var params = $(event.currentTarget).serializeJSON();
    updatingExpense.set(params["expense"])
    updatingExpense.save()//params["expense"])
    this.editExpenses[expenseID] = false; 
    this.render()  
  },

  deleteExpense: function(event){
    event.preventDefault()
    var expenseID = parseInt($(event.currentTarget).attr("data-id"));
    deletingExpense = this.collection.get(expenseID);
    deletingExpense.destroy()
    this.render()
  },
//<input type="datetime-local" id="date_time" class="form-control" name="expense[date_time]" value=<%= expense.get("date_time") %>>
  // deleteExpense:

  render: function(){
    renderedContent = this.template({expenses: this.showData, editExpenses: this.editExpenses,
     filterData: this.filterData});
    this.$el.html(renderedContent)
    return this
  }

});


