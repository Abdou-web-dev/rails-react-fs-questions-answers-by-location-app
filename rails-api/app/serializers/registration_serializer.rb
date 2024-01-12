# app/serializers/api/v1/registration_serializer.rb

      class RegistrationSerializer < ActiveModel::Serializer
        attributes :id, :email, :created_at, :updated_at # Add other attributes you want to include
        # attributes :email
  end
  