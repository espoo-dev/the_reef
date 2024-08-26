# frozen_string_literal: true

module Api
  module Embedded
    module V1
      class ApiController < ActionController::API
        include Pundit::Authorization
        after_action :verify_authorized

        before_action :authenticate_embedded_user

        before_action :set_paper_trail_whodunnit

        # rescue_from Pundit::NotAuthorizedError, with: :render_unauthorized
        rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
        rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
        rescue_from InvalidContractError, with: :render_bad_request

        def current_user
          mac_address = request.headers["Authorization"]
          EmbeddedServer.find_by(mac_address:)&.aquarium&.user
        end

        def authenticate_embedded_user
          # authorize :admin_dashboard, :full_access?
        end

        def page
          index_contract[:page]
        end

        def per_page
          index_contract[:per_page]
        end

        def render_unauthorized(message = "Unauthorized")
          render json: { error: message }, status: :unauthorized
        end

        def render_unprocessable_entity(exception)
          render json: { error: exception.message }, status: :unprocessable_entity
        end

        def render_not_found(exception)
          render json: { error: exception.message }, status: :not_found
        end

        def render_bad_request(exception)
          render json: { error: exception.message }, status: :bad_request
        end

        def permitted_params(*keys)
          params.permit(keys).to_h.with_indifferent_access
        end
      end
    end
  end
end
