# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Users" do
  describe "POST /api/embedded/v1/on_off_values" do
    before do
      post "/api/embedded/v1/on_off_values", params:, headers:
    end

    context "when user authenticated" do
      let(:headers) { embedded_auth_headers_for(user) }
      let(:user) { on_off_sensor.aquarium.user }
      let(:on_off_sensor) { create(:on_off_sensor) }

      context "when data is valid" do
        let(:params) do
          {
            value: true,
            on_off_sensor_id: on_off_sensor.id,
            type: "OnOffSensor",
          }
        end

        let(:expected_response) do
          { value: true, id: anything, created_at: anything }
        end

        it { expect(json_response).to match(expected_response) }
        it { expect(on_off_sensor.on_off_values.first).not_to be_nil }
        it { expect(response).to have_http_status(:created) }
      end

      context "when data is not valid" do
        context "when validation fail" do
          let(:params) do
            {
              value: true,
              on_off_sensor_id: -1,
              type: "OnOffSensor",
            }
          end

          let(:expected_response) do
            { error: "Validation failed: Email has already been taken" }
          end

          it { expect(json_response).to match(expected_response) }
          it { expect(response).to have_http_status(:unprocessable_entity) }
        end

        context "when parameters are missing" do
          let(:user_params) { {} }

          let(:expected_response) do
            { error: "Name is missing, Email is missing, Password is missing" }
          end

          it { expect(json_response).to match(expected_response) }
          it { expect(response).to have_http_status(:bad_request) }
        end
      end
    end
  end
end
