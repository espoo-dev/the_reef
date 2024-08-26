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
#  sensor_type                     :string
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
FactoryBot.define do
  factory :range_sensor do
    transient do
      user { create(:user) }
    end

    sequence(:name) { |n| "Sensor #{n}" }
    sequence(:description) { |n| "Description #{n}" }
    publish_data_to_server_interval { Time.zone.now }
    min_value { 1.0 }
    max_value { 10.0 }
    sensor_type { "temperature" }

    aquarium { create(:aquarium, :with_embedded_server, user:) }
  end
end
