ExpensesManager.Collections.Expenses = Backbone.Collection.extend({

  model: ExpensesManager.Models.Expense,
  url: "api/expenses",
  comparator: function( collection ){
    return( collection.get( 'date_time' ) );
  },

  filterData: function(filteringCriteria){
      var filteredCollection = new this.constructor();
      var sourceCollection = this;

      filteredCollection.reset(sourceCollection.filter(function(expense){
        return (filteringCriteria.apply(expense))
      }));

      return filteredCollection
  },

  filteredByDate: function(startDate, endDate){
    var filteringCriteria = function(){
      return ((!startDate || this.get("date_time") >= startDate) && (!endDate || this.get("date_time") <= endDate))
    } 
    return this.filterData(filteringCriteria)
  },

  filteredByAmount: function(minAmt, maxAmt){
    var filteringCriteria = function(){
      return ((!minAmt || this.get("amount") > minAmt) && (!maxAmt || this.get("amount") < maxAmt))
    } 
    return this.filterData(filteringCriteria)
  },

  aggregatedData: function(){
    var agData = {};
    this.models.forEach(function(model)  {
      var weekDates = model.getWeekDates();
      if (!agData[weekDates]){
        agData[weekDates] = {};
        agData[weekDates].total = 0;
        agData[weekDates].numExpenses = 0;
      }
      agData[weekDates].total += model.get("amount");
      agData[weekDates].numExpenses += 1;
    })

    for (var week in agData){
      agData[week].avgExpenses = agData[week].total/ agData[week].numExpenses
    }

    return agData
  },

});
