# frozen_string_literal: true

module Api
  module Client
    module V1
      class AquariaController < Api::Client::V1::ApiController
        def index
          aquaria = policy_scope(Aquarium)

          authorize(aquaria)

          render json: aquaria, each_serializer: AquariumSerializer, status: :ok
        end
      end
    end
  end
end
