# app/models/question.rb
# this is a validation statement. It's part of the model definition and is used to ensure that certain conditions are met before saving a record to the database.
class Question
  include Mongoid::Document
  include Mongoid::Timestamps

  field :title, type: String
  field :content, type: String
  field :location, type: String

  # associations for answers associated with a question.
  # Associations
  belongs_to :user
  has_many :answers
  has_many :favorites
  has_and_belongs_to_many :liked_by, class_name: 'User'

  # Validations
  validates :title, :content, :location, presence: true
  # This specifies the validation condition. In this context, it means that the title, content, and location fields must not be empty (i.e., they must be present) for the record to be considered valid.
  validates :title, length: { minimum: 5, maximum: 100 }
  validates :content, length: { minimum: 10 }
  validates :location, inclusion: { in: ['City A', 'City B', 'City C'] }

  # Custom validation method
  validate :custom_validation_method

  private

  def custom_validation_method
    # Add your custom validation logic here
    errors.add(:base, 'Custom validation error message') if some_condition_is_not_met
  end
end
