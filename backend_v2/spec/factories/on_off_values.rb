# frozen_string_literal: true

# == Schema Information
#
# Table name: on_off_values
#
#  id                 :bigint           not null, primary key
#  deleted_at         :datetime
#  value              :boolean          default(FALSE), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  on_off_actuator_id :bigint
#  on_off_sensor_id   :bigint
#
# Indexes
#
#  index_on_off_values_on_on_off_actuator_id  (on_off_actuator_id)
#  index_on_off_values_on_on_off_sensor_id    (on_off_sensor_id)
#
# Foreign Keys
#
#  fk_rails_...  (on_off_actuator_id => on_off_actuators.id)
#  fk_rails_...  (on_off_sensor_id => on_off_sensors.id)
#
FactoryBot.define do
  factory :on_off_value do
    value { true }
    on_off_sensor { nil }
    on_off_actuator
  end
end
