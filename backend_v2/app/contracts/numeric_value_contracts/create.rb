# frozen_string_literal: true

module NumericValueContracts
  class Create < ApplicationContract
    params do
      required(:value).filled(:string)
      required(:range_sensor_id).filled(:string)
    end
  end
end
