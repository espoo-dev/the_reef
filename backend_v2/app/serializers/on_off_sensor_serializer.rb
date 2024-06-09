# frozen_string_literal: true

class OnOffSensorSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
end
