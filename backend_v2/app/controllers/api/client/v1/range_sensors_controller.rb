# frozen_string_literal: true

module Api
  module Client
    module V1
      class RangeSensorsController < Api::Client::V1::ApiController
        def index
          range_sensors = policy_scope(RangeSensor).page(page).per(per_page)

          authorize(range_sensors)

          render json: range_sensors, each_serializer: RangeSensorSerializer, values_amount:, status: :ok
        end

        def index_contract
          @index_contract ||= RangeSensorContracts::Index.call(permitted_params(:page, :per_page, :values_amount))
        end

        def values_amount
          index_contract[:values_amount]
        end
      end
    end
  end
end
