ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def login
    old_controller = @controller
    @controller = SessionsController.new
    post :create, session: {email: 'guest@gmail.com', password: 'qwerty'}
    @controller = old_controller

    return session[:session_token]
  end
end
