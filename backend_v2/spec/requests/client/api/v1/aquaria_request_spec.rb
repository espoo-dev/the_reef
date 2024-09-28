# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Api::V1::AquariaController" do
  describe "GET /api/client/v1/aquaria" do
    let(:do_request) { get "/api/client/v1/aquaria", headers:, params: }

    let(:params) { {} }

    context "when user is authenticated" do
      let(:user) { create(:user) }
      let(:headers) { auth_headers_for(user) }
      let!(:aquarium) { create(:aquarium, :with_embedded_server, :with_dimension, user:) }

      before do
        create_list(:aquarium, 2)
        do_request
      end

      it { expect(response).to have_http_status(:ok) }

      it "returns user's aquaria" do
        expected_response = [
          {
            id: aquarium.id,
            name: aquarium.name,
            warning: false,
            dimension: {
              height_cm: aquarium.dimension.height_cm,
              length_cm: aquarium.dimension.length_cm,
              width_cm: aquarium.dimension.width_cm
            },
            embedded_server: {
              id: aquarium.embedded_server.id,
              mac_address: aquarium.embedded_server.mac_address,
              name: aquarium.embedded_server.name
            }

          }.with_indifferent_access
        ]

        expect(response.parsed_body).to eq(expected_response)
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
