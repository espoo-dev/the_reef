# frozen_string_literal: true

module Api
  module Embedded
    module V1
      class AquariaController < ApiController
        def current
          aquarium = current_user.aquaria.first

          render json: aquarium, status: :ok, serializer: EmbeddedAquariumSerializer
        end
      end
    end
  end
end
