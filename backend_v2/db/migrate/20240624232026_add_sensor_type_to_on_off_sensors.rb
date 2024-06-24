# frozen_string_literal: true

class AddSensorTypeToOnOffSensors < ActiveRecord::Migration[7.1]
  def change
    add_column :on_off_sensors, :sensor_type, :string
  end
end
