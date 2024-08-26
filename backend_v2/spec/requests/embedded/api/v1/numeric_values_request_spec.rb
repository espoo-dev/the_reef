# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Users" do
  describe "POST /api/embedded/v1/numeric_values" do
    before { post "/api/embedded/v1/numeric_values", params:, headers: }

    context "when user authenticated" do
      let(:headers) { embedded_auth_headers_for(user) }
      let(:user) { range_sensor.user }
      let(:range_sensor) { create(:range_sensor) }

      context "when data is valid" do
        let(:params) do
          {
            value: 10.0,
            range_sensor_id: range_sensor.id
          }
        end
        let(:expected_response) do
          { value: "10.0", id: an_instance_of(Integer), created_at: an_instance_of(String) }
        end

        it { expect(json_response).to match(expected_response) }
        it { expect(range_sensor.numeric_values.first).to be_persisted }
        it { expect(response).to have_http_status(:created) }
      end

      context "when data is not valid" do
        context "when parameters are missing" do
          let(:params) { {} }

          let(:expected_response) do
            { error: "Value is missing, range_sensor_id is missing" }
          end

          it { expect(json_response).to match(expected_response) }
          it { expect(response).to have_http_status(:bad_request) }
        end
      end
    end
  end
end
