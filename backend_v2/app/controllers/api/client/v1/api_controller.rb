# frozen_string_literal: true

module Api
  module Client
    module V1
      class ApiController < Api::BaseApiController
        before_action :authenticate_devise_api_token!

        def current_user
          current_devise_api_user
        end
      end
    end
  end
end
