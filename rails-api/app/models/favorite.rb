# app/models/favorite.rb

class Favorite
    include Mongoid::Document
    belongs_to :user
    belongs_to :question
  end
  