# app/serializers/api/v1/answer_serializer.rb

      class AnswerSerializer < ActiveModel::Serializer
        attributes :id, :content, :created_at, :updated_at
  
  end
  