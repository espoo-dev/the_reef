class AddIconUrlToOnOffSensors < ActiveRecord::Migration[7.1]
  def change
    add_column :on_off_sensors, :icon_url, :string
  end
end
