# frozen_string_literal: true

class CreateCurrentOnOffValues < ActiveRecord::Migration[7.1]
  def change
    create_table :current_on_off_values do |t|
      t.boolean :value, null: false, default: false
      t.datetime :deleted_at
      t.references :on_off_sensor, null: true, foreign_key: true
      t.references :on_off_actuator, null: true, foreign_key: true

      t.timestamps
    end
  end
end
