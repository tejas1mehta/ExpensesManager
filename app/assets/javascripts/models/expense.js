ExpensesManager.Models.Expense = Backbone.Model.extend({
  urlRoot: "/api/expenses",

  getWeekDates: function() {
    dString = this.get("date_time")
    d = new Date(dString);
    d.setHours(0,0,0);
    // d.setDate(d.getDate() + 4 - (d.getDay()||7));
    var yearStart = new Date(d.getFullYear(),0,1);
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)

    var weekDates = this.getStartEnd(d.getFullYear(), weekNo);

    return weekDates
  },

  getStartEnd: function(year, week){
    var d = new Date("Jan 01, "+year+" 01:00:00");
    var w = d.getTime() + 604800000 * (week-1);
    var n1 = new Date(w);
    var n2 = new Date(w + 518400000)
    return n1.toDateString() + " - " + n2.toDateString()
  } 
});
