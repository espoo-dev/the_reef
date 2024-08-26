# frozen_string_literal: true

module OnOffValueContracts
  class Create < ApplicationContract
    params do
      required(:value).filled(:string)
      required(:on_off_sensor_id).filled(:string)
    end
  end
end
