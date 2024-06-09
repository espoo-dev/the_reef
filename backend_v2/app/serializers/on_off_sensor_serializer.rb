# frozen_string_literal: true

class OnOffSensorSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :on_off_values

  def on_off_values
    on_off_values = object.on_off_values.order(created_at: :desc).limit(@instance_options[:values_amount])
    on_off_values.map do |on_off_value|
      OnOffValueSerializer.new(on_off_value)
    end
  end
end
