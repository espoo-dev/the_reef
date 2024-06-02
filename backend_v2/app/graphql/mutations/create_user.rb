# frozen_string_literal: true

module Mutations
  class CreateUser < BaseMutation
    null true
    argument :email, String, required: true
    argument :password, String, required: true

    type Types::UserType

    def resolve(email: nil, password: nil)
      User.create!(
        email:,
        password:
      )
    end
  end
end
