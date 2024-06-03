# frozen_string_literal: true

class CreateAquaria < ActiveRecord::Migration[7.1]
  def change
    create_table :aquaria do |t|
      t.string :name, null: false
      t.datetime :deleted_at

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :aquaria, %i[user_id name], unique: true
  end
end
