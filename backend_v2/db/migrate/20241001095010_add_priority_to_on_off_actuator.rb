class AddPriorityToOnOffActuator < ActiveRecord::Migration[7.1]
  def change
    add_column :on_off_actuators, :priority, :integer
  end
end
