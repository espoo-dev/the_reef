# frozen_string_literal: true

module OnOffActuatorContracts
  class Index < ApplicationContract
    params do
      optional(:page).filled(:integer)
      optional(:per_page).filled(:integer)
      optional(:values_amount).filled(:integer)
    end
  end
end
