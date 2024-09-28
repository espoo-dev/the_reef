# frozen_string_literal: true

# == Schema Information
#
# Table name: aquaria
#
#  id         :bigint           not null, primary key
#  deleted_at :datetime
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_aquaria_on_user_id           (user_id)
#  index_aquaria_on_user_id_and_name  (user_id,name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Aquarium < ApplicationRecord
  belongs_to :user
  has_one :dimension, dependent: :destroy
  has_one :embedded_server, dependent: :destroy
  has_many :on_off_sensors, dependent: :destroy
  has_many :range_sensors, dependent: :destroy
  has_many :on_off_actuators, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id }

  def warning?
    (on_off_sensors + range_sensors).any?(&:warning?)
  end
end
