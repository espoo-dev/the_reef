# frozen_string_literal: true

class CreateDimensions < ActiveRecord::Migration[7.1]
  def change
    create_table :dimensions do |t|
      t.integer :height_cm
      t.integer :width_cm
      t.integer :length_cm
      t.datetime :deleted_at

      t.references :aquarium, null: false, foreign_key: true

      t.timestamps
    end
  end
end
