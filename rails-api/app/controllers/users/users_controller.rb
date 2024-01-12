# # add code of USersController
# # and add code to invalidate the token

# class Users::UsersController < Devise::ActionController
#     include Devise::Controllers::Helpers  # Make sure to include this line
#     respond_to :json
#     before_action :authenticate_user!
#     # : Ensures that the user is authenticated before accessing any of these actions.

#     before_action :set_user, only: [:show, :edit, :update, :destroy]
#     # : Sets the @user instance variable for actions that need it.

#     def show
#         # : Placeholder for the show action. You can customize this to display user details.

#     def edit
#         # : Placeholder for the edit action. You can customize this to render an edit form.

#     def update
#         # : Updates the user's attributes based on the provided parameters.

#     def destroy
#         # : Deletes the user.

#     private section
#     # : Contains helper methods.

#     set_user
#     # : Finds the user based on the :id parameter.
#     user_params
#     # : Defines the permitted parameters for updating a user.

# end