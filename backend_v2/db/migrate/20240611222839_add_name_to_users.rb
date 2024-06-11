class AddNameToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :name, :string, null: false

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
