# app/models/answer.rb

class Answer
  include Mongoid::Document
  include Mongoid::Timestamps

  field :content, type: String

  # associations for the user who posted the answer and the question to which the answer belongs.
  # Associations
  belongs_to :user
  belongs_to :question

  # Validations
  validates :content, presence: true
  validates :content, length: { minimum: 5 }
  validate :custom_validation_method

  private

  def custom_validation_method
    # Add your custom validation logic here
    errors.add(:base, 'Custom validation error message') if some_condition_is_not_met
  end
end
