Rails.application.routes.draw do
    devise_for :users, controllers: {
      registrations: 'users/registrations',
      sessions: 'users/sessions' 
    }, path: 'users', as: 'auth_users'

      # Add the following line to include the :sign_out route
    # devise_scope :user do
    #   delete '/users/sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
    # end

      resources :questions do
      resources :answers
    end
    # resources :users, only: [:show, :edit, :update, :destroy] 
    #The line resources :users, only: [:show, :edit, :update, :destroy] in routes.rb is responsible for creating RESTful routes for the users resource. It generates routes for showing, editing, updating, and destroying user records. If you want to allow these actions in your application, you can include this line
    root 'questions#index'
end

