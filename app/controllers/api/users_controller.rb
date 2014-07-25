module Api
  class UsersController < ApplicationController
    def create
      @user= User.new(user_params)

      if @user.save
        login(@user)
        render json: @user
      else
        render json: @user.errors, :status => :unprocessable_entity # figure out what to do on backbone side if error
      end
    end

    def destroy
      @user = current_user
      @user.destroy!
      head :ok
    end

    private
    def user_params
      params.require(:user).permit(:email, :password).merge( params.permit(:password))
    end
  end
end