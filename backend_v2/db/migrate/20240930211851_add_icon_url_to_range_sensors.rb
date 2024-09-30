class AddIconUrlToRangeSensors < ActiveRecord::Migration[7.1]
  def change
    add_column :range_sensors, :icon_url, :string
  end
end
