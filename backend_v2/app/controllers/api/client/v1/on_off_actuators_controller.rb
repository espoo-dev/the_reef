# frozen_string_literal: true

module Api
  module Client
    module V1
      class OnOffActuatorsController < Api::Client::V1::ApiController
        def index
          on_off_actuators = policy_scope(OnOffActuator).page(page).per(per_page).order(:priority)

          authorize(on_off_actuators)

          render json: on_off_actuators, each_serializer: OnOffActuatorSerializer, values_amount:, status: :ok
        end

        def index_contract
          @index_contract ||= OnOffActuatorContracts::Index.call(permitted_params(:page, :per_page, :values_amount))
        end

        def values_amount
          index_contract[:values_amount]
        end
      end
    end
  end
end
