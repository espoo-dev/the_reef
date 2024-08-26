# frozen_string_literal: true

module Api
  module Embedded
    module V1
      class NumericValuesController < ApiController
        def create
          numeric_value = NumericValue.new(numeric_value_create_contract)

          authorize(numeric_value)

          numeric_value.save!

          render json: numeric_value, status: :created
        end

        private

        def numeric_value_create_contract
          NumericValueContracts::Create.call(permitted_params(:value, :range_sensor_id))
        end
      end
    end
  end
end
