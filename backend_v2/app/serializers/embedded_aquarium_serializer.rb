# frozen_string_literal: true

# app/serializers/aquarium_serializer.rb
class EmbeddedAquariumSerializer < ActiveModel::Serializer
  attributes :id, :range_sensors, :on_off_sensors, :on_off_actuators

  def range_sensors
    object.range_sensors.map do |sensor|
      {
        id: sensor.id,
        sensor_type: sensor.sensor_type,
        min: sensor.min_value,
        max: sensor.max_value
      }
    end
  end

  def on_off_sensors
    object.on_off_sensors.map do |sensor|
      {
        id: sensor.id,
        sensor_type: sensor.sensor_type
      }
    end
  end

  def on_off_actuators
    object.on_off_actuators.map do |actuator|
      {
        id: actuator.id,
        actuator_type: actuator.actuator_type
      }
    end
  end
end
