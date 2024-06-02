# frozen_string_literal: true

module DemoPack
  module Controllers
    module Api
      module V1
        class HelloWorldController < ::Api::ApplicationController
          skip_before_action :verify_authenticity_token, raise: false
          before_action :authenticate_devise_api_token!, only: :private_method

          def public_method
            render json: { message: "This method does not need authentication" }, status: :ok
          end

          def private_method
            render json: { message: "This method needs authentication" }, status: :ok
          end
        end
      end
    end
  end
end
