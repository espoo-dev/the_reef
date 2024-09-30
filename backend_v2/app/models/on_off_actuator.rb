# frozen_string_literal: true

# == Schema Information
#
# Table name: on_off_actuators
#
#  id                              :bigint           not null, primary key
#  actuator_type                   :string
#  deleted_at                      :datetime
#  description                     :string           not null
#  embedded_actuator_pin           :integer          not null
#  icon_url                        :string
#  name                            :string           not null
#  publish_data_to_server_interval :datetime         not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  aquarium_id                     :bigint           not null
#  on_off_sensor_id                :bigint
#  range_sensor_id                 :bigint
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
  belongs_to :on_off_sensor, optional: true
  belongs_to :range_sensor, optional: true
  has_many :on_off_values, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
  validates :publish_data_to_server_interval, presence: true
  validates :embedded_actuator_pin, presence: true
  validate :belongs_to_one_parent
  validates :actuator_type, presence: true, inclusion: { in: %w[water_pump fan] }

  delegate :user, to: :aquarium

  scope :by_user, lambda { |user|
    joins(:aquarium).where({ aquaria: { user_id: user.id } })
  }

  private

  def possible_parents
    [on_off_sensor, range_sensor]
  end

  def belongs_to_one_parent
    return if possible_parents.any?(&:present?)

    errors.add(:base, "must belong to either an OnOffSensor or an RangeSensor")
  end
end
