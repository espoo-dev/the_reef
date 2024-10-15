class AddPriorityToRangeSensor < ActiveRecord::Migration[7.1]
  def change
    add_column :range_sensors, :priority, :integer
  end
end
