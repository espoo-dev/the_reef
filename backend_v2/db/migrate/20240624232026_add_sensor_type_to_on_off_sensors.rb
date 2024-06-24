class AddSensorTypeToOnOffSensors < ActiveRecord::Migration[7.1]
  def change
    add_column :on_off_sensors, :sensor_type, :string, null: false
  end
end
