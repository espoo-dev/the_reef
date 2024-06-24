# frozen_string_literal: true

class AddSensorTypeToRangeSensors < ActiveRecord::Migration[7.1]
  def change
    add_column :range_sensors, :sensor_type, :string
  end
end
