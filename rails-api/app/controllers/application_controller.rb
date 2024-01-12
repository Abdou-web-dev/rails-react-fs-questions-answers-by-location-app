# require "application_responder"

    class ApplicationController < ActionController::API
      include ActionController::MimeResponds
      include Devise::Controllers::Helpers # Make sure to include this line
      # self.responder = ApplicationResponder
      # respond_to :html

        # protect_from_forgery with: :exception
        before_action :configure_permitted_parameters, if: :devise_controller?
      
        protected
      
        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation])
          devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
          devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :password_confirmation, :current_password])
        end
        
      end
      