# frozen_string_literal: true

# == Schema Information
#
# Table name: current_numeric_values
#
#  id              :bigint           not null, primary key
#  deleted_at      :datetime
#  value           :decimal(10, 2)   not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  range_sensor_id :bigint           not null
#
# Indexes
#
#  index_current_numeric_values_on_range_sensor_id  (range_sensor_id)
#
# Foreign Keys
#
#  fk_rails_...  (range_sensor_id => range_sensors.id)
#
FactoryBot.define do
  factory :current_numeric_value do
    sequence(:value) { |n| n * 1.0 }
    range_sensor
  end
end
