module Api
  class SessionsController < ApplicationController
    def create
      @user = User.find_by_credentials(user_params[:email], user_params[:password])

      login(@user)
      render json: @user
    end

    def destroy
      logout
      head :ok
    end

    private
    def user_params
      params.require(:session).permit(:email, :password)
    end
  end
end
