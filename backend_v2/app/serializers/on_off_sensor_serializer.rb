# frozen_string_literal: true

# :reek:InstanceVariableAssumption
class OnOffSensorSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :on_off_values, :current_on_off_value, :on_values_count, :icon_url

  def on_off_values
    on_off_values = object.on_off_values.order(created_at: :desc).limit(@instance_options[:values_amount])
    on_off_values.map do |on_off_value|
      OnOffValueSerializer.new(on_off_value)
    end.reverse
  end

  def current_on_off_value
    on_off_value = object.on_off_values.order(created_at: :desc).limit(1).first
    OnOffValueSerializer.new(on_off_value) if on_off_value.present?
  end

  def on_values_count
    object.values_count(24.hours.ago, true)
  end
end
