# frozen_string_literal: true

class OnOffValueSerializer < ActiveModel::Serializer
  attributes :id, :value, :created_at

  def created_at
    object.created_at.strftime("%Y-%m-%d %H:%M:%S")
  end
end
