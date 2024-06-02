# frozen_string_literal: true

require "rails_helper"

RSpec.describe "HelloWorlds" do
  describe "GET /api/v1/public_method" do
    before { get "/api/v1/public_method" }

    it "renders json with message" do
      expect(response.body).to include("This method does not need authentication")
    end

    it "receives http status ok" do
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /api/v1/private_method" do
    let(:user) { create(:user) }

    context "when user is not authenticated" do
      before do
        get "/api/v1/private_method"
      end

      it "renders json with message" do
        expect(response.body).to include("error", "Invalid token")
      end

      it "receives http status unauthorized" do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when user is authenticated" do
      let(:instance_token) { Devise::Api::TokensService::Create.new(resource_owner: user, previous_refresh_token: nil) }
      let(:token) { Devise::Api::Token.where(resource_owner: user).reload.last.try(:access_token) }

      before do
        instance_token.call
        get "/api/v1/private_method", params: {}, headers: { Authorization: token }
      end

      it "renders json with message" do
        expect(response.body).to include("This method needs authentication")
      end

      it "receives http status ok" do
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
