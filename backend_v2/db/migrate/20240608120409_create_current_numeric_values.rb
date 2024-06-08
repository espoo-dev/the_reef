# frozen_string_literal: true

class CreateCurrentNumericValues < ActiveRecord::Migration[7.1]
  def change
    create_table :current_numeric_values do |t|
      t.decimal :value, precision: 10, scale: 2, null: false
      t.datetime :deleted_at
      t.references :range_sensor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
