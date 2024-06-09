# frozen_string_literal: true

class RenameCurrentOnOffValuesToTOnOffValues < ActiveRecord::Migration[7.1]
  def change
    rename_table :current_on_off_values, :on_off_values
  end
end
