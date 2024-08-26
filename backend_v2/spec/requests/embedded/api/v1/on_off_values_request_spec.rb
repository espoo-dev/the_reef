# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Users" do
  describe "POST /api/embedded/v1/on_off_values" do
    before { post "/api/embedded/v1/on_off_values", params:, headers: }

    context "when user authenticated" do
      let(:headers) { embedded_auth_headers_for(user) }
      let(:user) { on_off_sensor.aquarium.user }
      let(:on_off_sensor) { create(:on_off_sensor) }

      context "when data is valid" do
        let(:params) do
          {
            value: true,
            on_off_sensor_id: on_off_sensor.id
          }
        end
        let(:expected_response) do
          { value: true, id: an_instance_of(Integer), created_at: an_instance_of(String) }
        end

        it { expect(json_response).to match(expected_response) }
        it { expect(on_off_sensor.on_off_values.first).to be_persisted }
        it { expect(response).to have_http_status(:created) }
      end

      context "when data is not valid" do
        context "when validation fail" do
          let(:params) do
            {
              value: true,
              on_off_sensor_id: -1,
              type: "OnOffSensor"
            }
          end

          let(:expected_response) do
            { error: "Validation failed: must belong to either an OnOffSensor or an OnOffActuator" }
          end

          it { expect(json_response).to match(expected_response) }
          it { expect(response).to have_http_status(:unprocessable_entity) }
        end

        context "when parameters are missing" do
          let(:params) { {} }

          let(:expected_response) do
            { error: "Value is missing, on_off_sensor_id is missing" }
          end

          it { expect(json_response).to match(expected_response) }
          it { expect(response).to have_http_status(:bad_request) }
        end
      end
    end
  end
end
