# frozen_string_literal: true

# == Schema Information
#
# Table name: on_off_actuators
#
#  id                              :bigint           not null, primary key
#  deleted_at                      :datetime
#  description                     :string           not null
#  embedded_actuator_pin           :integer          not null
#  name                            :string           not null
#  publish_data_to_server_interval :datetime         not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  aquarium_id                     :bigint           not null
#  on_off_sensor_id                :bigint           not null
#  range_sensor_id                 :bigint           not null
#
# Indexes
#
#  index_on_off_actuators_on_aquarium_id       (aquarium_id)
#  index_on_off_actuators_on_on_off_sensor_id  (on_off_sensor_id)
#  index_on_off_actuators_on_range_sensor_id   (range_sensor_id)
#
# Foreign Keys
#
#  fk_rails_...  (aquarium_id => aquaria.id)
#  fk_rails_...  (on_off_sensor_id => on_off_sensors.id)
#  fk_rails_...  (range_sensor_id => range_sensors.id)
#
class OnOffActuator < ApplicationRecord
  belongs_to :aquarium
  belongs_to :on_off_sensor
  belongs_to :range_sensor
  has_many :on_off_values, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
  validates :publish_data_to_server_interval, presence: true
  validates :embedded_actuator_pin, presence: true
end
