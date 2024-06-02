# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    description "Main app User"
    field :email, String, null: false
    field :id, ID, null: false
  end
end
