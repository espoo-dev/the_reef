# frozen_string_literal: true

class CreateEmbeddedServers < ActiveRecord::Migration[7.1]
  def change
    create_table :embedded_servers do |t|
      t.string :name
      t.string :mac_address
      t.datetime :deleted_at

      t.references :aquarium, null: false, foreign_key: true

      t.timestamps
    end
  end
end
