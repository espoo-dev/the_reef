# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Users" do
  describe "GET /api/embedded/v1/aquaria/current" do
    context "when user authenticated" do
      let(:headers) { embedded_auth_headers_for(user) }
      let(:user) { aquarium.user }
      let(:aquarium) { create(:aquarium, :with_embedded_server) }
      let!(:on_off_sensor) { create(:on_off_sensor, aquarium:) }
      let!(:on_off_actuator) { create(:on_off_actuator, aquarium:) }
      let!(:range_sensor) { create(:range_sensor, aquarium:) }

      before { get "/api/embedded/v1/aquaria/current", headers: }

      context "when data is valid" do
        let(:expected_response) do
          {
            id: aquarium.id,
            range_sensors: [
              {
                id: range_sensor.id,
                sensor_type: range_sensor.sensor_type,
                min: range_sensor.min_value.to_s,
                max: range_sensor.max_value.to_s
              }
            ],
            on_off_sensors: [
              {
                id: on_off_sensor.id,
                sensor_type: on_off_sensor.sensor_type
              }
            ],
            on_off_actuators: [
              {
                id: on_off_actuator.id,
                actuator_type: on_off_actuator.actuator_type
              }
            ]
          }
        end

        it { expect(json_response).to match(expected_response) }
        it { expect(response).to have_http_status(:ok) }
      end
    end
  end
end
