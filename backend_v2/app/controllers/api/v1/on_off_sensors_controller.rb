# frozen_string_literal: true

module Api
  module V1
    class OnOffSensorsController < Api::V1::ApiController
      def index
        on_off_sensors = policy_scope(OnOffSensor).page(page).per(per_page)

        authorize(on_off_sensors)

        render json: on_off_sensors, each_serializer: OnOffSensorSerializer, values_amount:, status: :ok
      end

      def index_contract
        @index_contract ||= OnOffSensorContracts::Index.call(permitted_params(:page, :per_page, :values_amount))
      end

      def values_amount
        index_contract[:values_amount]
      end

      def page
        index_contract[:page]
      end

      def per_page
        index_contract[:per_page]
      end
    end
  end
end
