# frozen_string_literal: true

# app/serializers/aquarium_serializer.rb
class AquariumSerializer < ActiveModel::Serializer
  attributes :id, :name, :warning

  has_one :dimension
  has_one :embedded_server

  def warning = object.warning?
end
