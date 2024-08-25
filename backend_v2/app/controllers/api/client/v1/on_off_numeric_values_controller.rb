# frozen_string_literal: true

module Api
  module Client
    module V1
      class OnOffNumericValuesController < Api::Client::V1::ApiController
        skip_before_action :authenticate_devise_api_token!, only: :seed_data
        skip_after_action :verify_authorized, only: :seed_data

        def seed_data
          now = DateTime.now
          range_sensor = RangeSensor.find(params["range_sensor_id"])

          params[:data].each do |numeric_data|
            today_created_at = now.change(hour: numeric_data["hour"].remove("h").to_i)
            yesterday_created_at = now.change(hour: numeric_data["hour"].remove("h").to_i) - 1.day

            NumericValue.create(value: numeric_data["today"], created_at: today_created_at, range_sensor:)
            NumericValue.create(value: numeric_data["yesterday"], created_at: yesterday_created_at, range_sensor:)
          end

          render json: { result: "created" }, status: :ok
        end
      end
    end
  end
end
