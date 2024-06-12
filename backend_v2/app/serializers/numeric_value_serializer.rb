# frozen_string_literal: true

class NumericValueSerializer < ActiveModel::Serializer
  attributes :id, :value, :created_at

  def created_at
    object.created_at.strftime("%Y-%m-%d %H:%M:%S")
  end
end
