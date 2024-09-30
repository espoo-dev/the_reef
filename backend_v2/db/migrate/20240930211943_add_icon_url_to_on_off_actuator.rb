class AddIconUrlToOnOffActuator < ActiveRecord::Migration[7.1]
  def change
    add_column :on_off_actuators, :icon_url, :string
  end
end
