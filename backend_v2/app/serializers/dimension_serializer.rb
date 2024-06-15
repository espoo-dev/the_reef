# frozen_string_literal: true

# app/serializers/dimension_serializer.rb
class DimensionSerializer < ActiveModel::Serializer
  attributes :height_cm, :width_cm, :length_cm
end
