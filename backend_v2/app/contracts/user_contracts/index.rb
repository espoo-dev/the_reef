# frozen_string_literal: true

module UserContracts
  class Index < ApplicationContract
    params do
      optional(:page).filled(:integer)
      optional(:per_page).filled(:integer)
    end
  end
end
