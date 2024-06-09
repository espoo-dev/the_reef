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
              description: on_off_sensor.description
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
