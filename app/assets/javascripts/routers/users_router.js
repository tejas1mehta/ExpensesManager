ExpensesManager.Routers.Users = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl //$("#content")
  },

  before: function(toRoute){
    if (!ExpensesManager.currentUser && (toRoute == "expenses/new" || toRoute == "expenses/index")){
      Backbone.history.navigate("#", { trigger: true })
      return false
    }
  },

  routes: {
    "": "NewSession",
    "users/new": "UserNew",
    "expenses/index" : "ExpensesIndex",
    "expenses/index_weekly" : "ExpensesWeekly",
    "expenses/new" : "ExpensesNew",
    "logout": "Logout"
  },

  ExpensesWeekly: function(){
    var router = this;
    ExpensesManager.allExpenses.fetch({
      success: function(){
        var expensesWeeklyView = new ExpensesManager.Views.ExpensesWeeklyData({
          collection: ExpensesManager.allExpenses.sort()
        })
        router._swapView(expensesWeeklyView)  
      }
    })
  },

  Logout: function(id){
    $("#navbar").empty()
    $.ajax({
      type: "DELETE",
      url: "/api/session"
    })
    ExpensesManager.currentUser = null
    console.log("logged out")
    Backbone.history.navigate("", { trigger: true });
  },

  ExpensesNew: function(){
    var newExpensesView = new ExpensesManager.Views.ExpensesNew()
    this._swapView(newExpensesView)    
  },

  ExpensesIndex: function(){
    var router = this;
    ExpensesManager.allExpenses.fetch({
      success: function(){
        var allExpensesView = new ExpensesManager.Views.ExpensesIndex({
          collection: ExpensesManager.allExpenses.sort()
        })
        router._swapView(allExpensesView)  
      }
    })
  },

  NewSession: function(){
    if (ExpensesManager.currentUser){
      ExpensesManager.currentRouter.navigate("expenses/index", { trigger: true });
    } else{
      var newSessionView = new ExpensesManager.Views.SessionsNew()
      this._swapView(newSessionView)
    }
  },

  UserNew: function(){
    var newUserView = new ExpensesManager.Views.UsersNew()
    this._swapView(newUserView)
  },

  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.$rootEl.html(newView.render().$el);
    this.currentView = newView;
  }
});

