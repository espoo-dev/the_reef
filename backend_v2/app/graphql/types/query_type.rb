# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :users,
      [Types::UserType],
      null: false,
      description: "Return a list of users"

    def users
      User.all
    end
  end
end
