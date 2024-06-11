# frozen_string_literal: true

module UserContracts
  class Create < ApplicationContract
    params do
      required(:name).filled(:string)
      required(:email).filled(:string)
      required(:password).filled(:string)
    end
  end
end
