# app/models/user.rb
# However, when you are using Mongoid as the ORM for MongoDB in your Rails application, you don't necessarily need an ApplicationRecord class. Instead, you can directly include Mongoid::Document in your models.
class User 
  include Mongoid::Document 
  include Mongoid::Timestamps
  devise :database_authenticatable, :rememberable, :registerable, :recoverable, :validatable

  field :email, type: String, default: ""
  field :encrypted_password, type: String, default: ""
  field :reset_password_token, type: String
  field :reset_password_sent_at, type: Time
  field :authentication_token, type: String, default: ""

  # associations for questions posted by the user and answers posted by the user.
  has_many :questions
  has_many :answers
  has_many :favorites

  # Validations
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :encrypted_password, presence: true, length: { minimum: Devise.password_length.first }
  # validates :password_confirmation, presence: true

  # Other fields and associations as needed
  # store_in collection: 'custom_users' # Specify the name of the collection

end