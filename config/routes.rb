Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :destroy, :update]
    resources :expenses, only: [:index, :create, :destroy, :update]
  end
end
