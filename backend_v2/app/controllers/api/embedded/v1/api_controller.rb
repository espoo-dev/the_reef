# frozen_string_literal: true

module Api
  module Embedded
    module V1
      class ApiController < Api::BaseApiController
        before_action :authenticate_embedded_user

        def current_user
          mac_address = request.headers["Authorization"]
          EmbeddedServer.find_by(mac_address:)&.aquarium&.user
        end

        def authenticate_embedded_user
          authorize :embedded_user, :embedded_access?
        end
      end
    end
  end
end
