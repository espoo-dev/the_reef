class UpdateOnOffActuatorsToMakeSensorsOptional < ActiveRecord::Migration[7.1]
  def change
    change_column_null :on_off_actuators, :on_off_sensor_id, true
    change_column_null :on_off_actuators, :range_sensor_id, true
  end
end
