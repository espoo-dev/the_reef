# frozen_string_literal: true

class RenameCurrentNumericValuesToNumericValues < ActiveRecord::Migration[7.1]
  def change
    rename_table :current_numeric_values, :numeric_values
  end
end
