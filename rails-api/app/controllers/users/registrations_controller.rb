# app/controllers/users/registrations_controller.rb

class Users::RegistrationsController < Devise::RegistrationsController
  include Devise::Controllers::Helpers  # Make sure to include this line
  respond_to :json

    def create
      build_resource(sign_up_params)
  
      if resource.save
        yield resource if block_given?
         # Generate and assign authentication token
        resource.authentication_token = generate_authentication_token
        resource.save
        render json: { user: resource }, status: :created
        # render json: { user: { authentication_token: resource.authentication_token } }, status: :created , this line will render a user object that contains an authentication_token field only
      else
        clean_up_passwords resource
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end

    

    private

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
    
    def generate_authentication_token
      # I can use any method to generate a unique token, for example, SecureRandom
      SecureRandom.hex(32)
    end
    
  end
  
  