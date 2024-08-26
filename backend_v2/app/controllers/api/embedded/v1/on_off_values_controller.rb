# frozen_string_literal: true

module Api
  module Embedded
    module V1
      class OnOffValuesController < ApiController
        def create
          on_off_value = OnOffValue.new(on_off_value_create_contract)

          authorize(on_off_value)

          # binding.pry
          on_off_value.save!

          render json: on_off_value, status: :created
        end

        private

        def on_off_value_create_contract
          OnOffValueContracts::Create.call(permitted_params(:value, :on_off_sensor_id))
        end
      end
    end
  end
end
