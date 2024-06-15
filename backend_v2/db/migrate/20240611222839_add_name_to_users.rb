# frozen_string_literal: true

class AddNameToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :name, :string

    reversible do |dir|
      dir.up do
        execute <<-SQL.squish
          UPDATE users
          SET name = email
        SQL
      end
    end
  end
end
