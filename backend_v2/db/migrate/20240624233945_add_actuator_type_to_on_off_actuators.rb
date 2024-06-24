# frozen_string_literal: true

class AddActuatorTypeToOnOffActuators < ActiveRecord::Migration[7.1]
  def change
    add_column :on_off_actuators, :actuator_type, :string
  end
end
