class AddPriorityToOnOffSensor < ActiveRecord::Migration[7.1]
  def change
    add_column :on_off_sensors, :priority, :integer
  end
end
