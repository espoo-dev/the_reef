# frozen_string_literal: true

require "rails_helper"

RSpec.describe "DemoPack::Controllers::HelloWorld" do
  describe "GET /public_method" do
    before { get "/public_method" }

    it "renders message" do
      expect(response.body).to eq("This method does not need authentication")
    end
  end

  describe "GET /private_method" do
    let(:user) { create(:user) }

    before do
      sign_in user
      get "/private_method"
    end

    it "renders message" do
      expect(response.body).to eq("This method needs authentication")
    end
  end

  describe "GET /search" do
    let!(:user) { create(:user) }

    before do
      UsersIndex.import
      sign_in user
      get "/search", params: { query: user.email }
    end

    after do
      UsersIndex.delete
    end

    it "renders message" do
      parsed_body = response.parsed_body
      expect(parsed_body).to eq([user.as_json])
    end
  end
end
