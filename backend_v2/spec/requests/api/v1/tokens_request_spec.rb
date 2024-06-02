# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Tokens" do
  describe "POST /api/v1/tokens" do
    before do
      post "/api/v1/tokens", params:
    end

    context "when data is valid" do
      let(:user) { create(:user) }
      let(:params) do
        {
          email: user.email,
          password: user.password
        }
      end

      it { expect(json_response["token"]).not_to be_nil }
      it { expect(response).to have_http_status(:ok) }
    end

    context "when data is not valid" do
      let(:user) { create(:user) }
      let(:params) do
        {
          email: user.email,
          password: "wrong password"
        }
      end
      let(:expected_response) do
        { error: "invalid_authentication",
          error_description: ["Email or password is invalid"] }
      end

      it { expect(json_response).to match(expected_response) }
      it { expect(response).to have_http_status(:unauthorized) }
    end
  end
end
