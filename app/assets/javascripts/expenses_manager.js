window.ExpensesManager = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  addNavbar: function(){
    ExpensesManager.navbarView = new ExpensesManager.Views.Navbar();
    $("#navbar").html(ExpensesManager.navbarView.render().$el)
  },
  initialize: function() {
    ExpensesManager.allExpenses = new ExpensesManager.Collections.Expenses();
    ExpensesManager.currentRouter = new ExpensesManager.Routers.Users({
      $rootEl: $("div#content"),
      $navbar: $("div#navbar")
    });

    if (!Backbone.History.started){
          Backbone.history.start();
    }

    Backbone.history.navigate(window.location.hash, { trigger: true }) 
  }
};

$(document).ready(function(){
  ExpensesManager.initialize();
});

var originalRoute = Backbone.Router.prototype.route;

var nop = function(){};

_.extend(Backbone.Router.prototype, {

  // Add default before filter.
  before: nop,

  // Add default after filter.
  after: nop,

  route: function(route, name, callback) {

    if( !callback ){
      callback = this[ name ];
    }
    var executeFn

    var wrappedCallback = _.bind( function() {

      var callbackArgs = [ route, _.toArray(arguments) ];
      var beforeCallback;

      if ( _.isFunction(this.before) ) {

        beforeCallback = this.before;
      } else if ( typeof this.before[route] !== "undefined" ) {

        beforeCallback = this.before[route];
      } else {

        beforeCallback = nop;
      }

      executeFn = beforeCallback.apply(this, callbackArgs);

      if( callback ) {
        callback.apply( this, arguments );
      }

      var afterCallback;
      if ( _.isFunction(this.after) ) {

        afterCallback = this.after;

      } else if ( typeof this.after[route] !== "undefined" ) {

        afterCallback = this.after[route];

      } else {

        afterCallback = nop;
      }

      afterCallback.apply( this, callbackArgs );

    }, this);

    if (executeFn !== false){
      return originalRoute.call( this, route, name, wrappedCallback );
    }
  }

});