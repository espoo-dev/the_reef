# frozen_string_literal: true

class CreateOnOffActuators < ActiveRecord::Migration[7.1]
  def change
    create_table :on_off_actuators do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.datetime :publish_data_to_server_interval, null: false
      t.integer :embedded_actuator_pin, null: false
      t.datetime :deleted_at

      t.references :aquarium, null: false, foreign_key: true
      t.references :on_off_sensor, null: false, foreign_key: true
      t.references :range_sensor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
