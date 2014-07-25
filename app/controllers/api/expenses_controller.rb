module Api
  class ExpensesController < ApplicationController
    before_action :require_login, only: [:create, :index]
    before_action :author_confirm, only: [:destroy, :update]

    def index
      @expenses = current_user.expenses

      render json: @expenses
    end

    def create
      @expense = current_user.expenses.new(expenses_params) #check if works?
      if @expense.save
        render json: @expense
      else
        render json: @expense.errors, :status => :unprocessable_entity 
      end
    end

    def destroy
      @expense = Expense.find(params[:id])
      @expense.destroy!
      head :ok
    end

    def update
      @expense = Expense.find(params[:id])      
      if @expense.update_attributes(expenses_params)
        render json: @expense
      else
        render json: @expense.errors, :status => :unprocessable_entity 
      end
    end

    private
    def expenses_params
        params.require(:expense).permit(:description, :amount, :date_time, :comment)
    end
  end
end