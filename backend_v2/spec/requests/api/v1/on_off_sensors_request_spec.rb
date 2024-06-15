# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Api::V1::OnOffSensors" do
  describe "GET /api/v1/on_off_sensors" do
    let(:do_request) { get "/api/v1/on_off_sensors", headers:, params: }

    let(:params) { {} }

    context "when user is authenticated" do
      let(:user) { create(:user, admin: true) }
      let(:headers) { auth_headers_for(user) }

      context "when has no page or per_page params" do
        let!(:on_off_sensor) { create(:on_off_sensor, user:) }

        before do
          create_list(:on_off_sensor, 2)
          do_request
        end

        it { expect(response).to have_http_status(:ok) }

        it "returns on_off_sensors" do
          expected_response = [
            {
              id: on_off_sensor.id,
              name: on_off_sensor.name,
              description: on_off_sensor.description,
              on_off_values: [],
              current_on_off_value: nil
            }.with_indifferent_access
          ]

          expect(response.parsed_body).to eq(expected_response)
        end
      end

      context "when has page and per_page params" do
        let(:params) { { page: 1, per_page: 5 } }

        before do
          create_list(:on_off_sensor, 6, user:)
          do_request
        end

        it { expect(response).to have_http_status(:ok) }

        it "returns on_off_sensors according to pagination" do
          expect(response.parsed_body.count).to eq(5)
        end
      end

      context "when has values_amount params" do
        let(:params) { { values_amount: 2 } }
        let(:on_off_sensor) { create(:on_off_sensor, user:) }
        let(:first_on_off_value) do
          create(:on_off_value, on_off_sensor:, on_off_actuator: nil, created_at: Time.zone.now)
        end
        let(:second_on_off_value) do
          create(:on_off_value, on_off_sensor:, on_off_actuator: nil, created_at: 1.day.from_now)
        end
        let(:third_on_off_value) do
          create(:on_off_value, on_off_sensor:, on_off_actuator: nil, created_at: 2.days.from_now)
        end

        let(:on_off_values) { [first_on_off_value, second_on_off_value, third_on_off_value] }

        before do
          on_off_values
          do_request
        end

        it { expect(response).to have_http_status(:ok) }

        it "returns on_off_values according to values_amount" do
          expected_response = [
            {
              id: on_off_sensor.id,
              name: on_off_sensor.name,
              description: on_off_sensor.description,
              on_off_values: [
                {
                  id: second_on_off_value.id,
                  value: second_on_off_value.value,
                  created_at: second_on_off_value.created_at.strftime("%Y-%m-%d %H:%M:%S")
                },
                {
                  id: third_on_off_value.id,
                  value: third_on_off_value.value,
                  created_at: third_on_off_value.created_at.strftime("%Y-%m-%d %H:%M:%S")
                }
              ],
              current_on_off_value:
                {
                  id: third_on_off_value.id,
                  value: third_on_off_value.value,
                  created_at: third_on_off_value.created_at.strftime("%Y-%m-%d %H:%M:%S")
                }
            }.with_indifferent_access
          ]
          expect(response.parsed_body).to eq(expected_response)
        end

        it "returns only 2 on_off_values" do
          expect(json_response[0][:on_off_values].count).to eq(2)
        end
      end
    end

    context "when user unauthenticated" do
      context "when has user" do
        before { do_request }

        it { expect(response).to have_http_status(:unauthorized) }

        it {
          expect(response.parsed_body["error"]).to eq("invalid_token")
        }
      end
    end
  end
end
