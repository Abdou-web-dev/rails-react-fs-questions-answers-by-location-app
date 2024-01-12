class Users::SessionsController < Devise::SessionsController
  include Devise::Controllers::Helpers  # Make sure to include this line
  # respond_to :json

  def create
    @user = User.find_by(email: sign_in_params[:email])
    # This code checks if the provided email exists in the database and if the associated password is valid. If the email and password match, it signs in the user and returns the user information along with the authentication token. If the email or password is invalid, it returns an unauthorized response with an error message.
    if @user&.valid_password?(sign_in_params[:password])
      sign_in(@user)
          @user.authentication_token = generate_authentication_token
      render json: { user: @user}, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unauthorized
    end
  end
  # @user === resource

  
  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

  def generate_authentication_token
    SecureRandom.hex(32)
  end
end

# class Users::SessionsController < Devise::SessionsController
#   respond_to :json

#   rescue_from Exception do |e|
#     Rails.logger.error("Error in SessionsController: #{e.message}")
#     render json: { error: e.message }, status: :unprocessable_entity
#   end

#   def create
#     Rails.logger.debug("Attempting to create session with parameters: #{params.inspect}")

#     self.resource = warden.authenticate!(auth_options)

#     # Ensure the user is signed in
#     sign_in(resource_name, resource)

#     # Generate and assign authentication token
#     resource.authentication_token = generate_authentication_token
#     resource.save

#     render json: { user: resource, token: resource.authentication_token }, status: :created
#   rescue ActionController::ParameterMissing => e
#     render json: { error: "Missing parameters: #{e.param}" }, status: :unprocessable_entity
#   rescue ActiveRecord::RecordInvalid => e
#     render json: { error: "Record invalid: #{e.record.errors.full_messages.join(', ')}" }, status: :unprocessable_entity
#   rescue Devise::AuthenticationError => e
#     render json: { error: "Authentication error: #{e.message}" }, status: :unauthorized
#   end

#   private

#   def generate_authentication_token
#     SecureRandom.hex
#   end
# end
