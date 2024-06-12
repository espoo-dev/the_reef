# frozen_string_literal: true

# :reek:InstanceVariableAssumption
class RangeSensorSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :min_value, :max_value, :numeric_values, :current_numeric_value

  def numeric_values
    numeric_values = object.numeric_values.order(created_at: :desc).limit(@instance_options[:values_amount])
    numeric_values.map do |numeric_value|
      NumericValueSerializer.new(numeric_value)
    end.reverse
  end

  def current_numeric_value
    numeric_value = object.numeric_values.order(created_at: :desc).limit(1).first
    NumericValueSerializer.new(numeric_value) if numeric_value.present?
  end
end
