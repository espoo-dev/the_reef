# frozen_string_literal: true

# == Schema Information
#
# Table name: range_sensors
#
#  id                              :bigint           not null, primary key
#  deleted_at                      :datetime
#  description                     :string           not null
#  max_value                       :decimal(, )      not null
#  min_value                       :decimal(, )      not null
#  name                            :string           not null
#  publish_data_to_server_interval :datetime         not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  aquarium_id                     :bigint           not null
#
# Indexes
#
#  index_range_sensors_on_aquarium_id  (aquarium_id)
#
# Foreign Keys
#
#  fk_rails_...  (aquarium_id => aquaria.id)
#
class RangeSensor < ApplicationRecord
  belongs_to :aquarium
  has_one :on_off_actuator, dependent: :destroy
  has_many :current_numeric_values, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
  validates :publish_data_to_server_interval, presence: true
  validates :min_value, presence: true, numericality: { less_than: :max_value }
  validates :max_value, presence: true, numericality: { greater_than: :min_value }
end
