ExpensesManager.Views.ExpensesWeeklyData = Backbone.View.extend({

  template: JST['expenses/weekly'],

  initialize: function(){
    this.weeklyData = this.collection.aggregatedData();
  },
  
  events:{
    "click #print" : "printData"
  },

  printData: function(event){
    event.preventDefault()
    window.print()
  },
  
  render: function(){
    renderedContent = this.template({weeklyExpenses: this.weeklyData});
    this.$el.html(renderedContent)
    return this
  },



});


