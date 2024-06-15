# frozen_string_literal: true

# app/serializers/dimension_serializer.rb
class EmbeddedServerSerializer < ActiveModel::Serializer
  attributes :id, :name, :mac_address
end
