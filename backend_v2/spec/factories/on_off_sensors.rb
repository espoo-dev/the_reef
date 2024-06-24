# frozen_string_literal: true

# == Schema Information
#
# Table name: on_off_sensors
#
#  id                              :bigint           not null, primary key
#  deleted_at                      :datetime
#  description                     :string           not null
#  name                            :string           not null
#  publish_data_to_server_interval :datetime         not null
#  sensor_type                     :string           not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  aquarium_id                     :bigint           not null
#
# Indexes
#
#  index_on_off_sensors_on_aquarium_id  (aquarium_id)
#
# Foreign Keys
#
#  fk_rails_...  (aquarium_id => aquaria.id)
#
FactoryBot.define do
  factory :on_off_sensor do
    transient do
      user { create(:user) }
    end

    sequence(:name) { |n| "Sensor #{n}" }
    sequence(:description) { |n| "Description #{n}" }
    publish_data_to_server_interval { Time.zone.now }
    sensor_type { "water_level" }
    aquarium { association :aquarium, user: }
  end
end
