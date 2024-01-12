# app/serializers/user_serializer.rb

        class UserSerializer < ActiveModel::Serializer
            attributes :id, :email, :created_at, :updated_at # Add other attributes you want to include
end
  