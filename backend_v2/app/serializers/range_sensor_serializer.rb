# frozen_string_literal: true

# :reek:InstanceVariableAssumption
class RangeSensorSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :min_value, :max_value, :numeric_values, :current_numeric_value,
    :numeric_value_on_range, :numeric_value_under_range, :numeric_value_over_range, :values_out_of_range_count

  def numeric_values
    numeric_values = object.numeric_values.order(created_at: :desc).limit(@instance_options[:values_amount])
    numeric_values.map do |numeric_value|
      NumericValueSerializer.new(numeric_value)
    end.reverse
  end

  def current_numeric_value
    NumericValueSerializer.new(object.current_numeric_value) if object.current_numeric_value
  end

  def numeric_value_on_range
    object.numeric_value_on_range?
  end

  def numeric_value_under_range
    object.numeric_value_under_range?
  end

  def numeric_value_over_range
    object.numeric_value_over_range?
  end

  def values_out_of_range_count
    object.values_out_of_range_count(24.hours.ago)
  end
end
