# frozen_string_literal: true

require "rails_helper"

RSpec.describe "users query" do
  context "when users exist" do
    let!(:user) { create(:user) }

    let(:user_data) do
      {
        "id" => user.id.to_s,
        "email" => user.email
      }
    end

    let(:query_string) do
      "{
        users {
          id
          email
        }
      }"
    end

    let(:request) { post graphql_path, params: { query: query_string } }
    let(:json_response) { response.parsed_body }

    before { request }

    it "returns user data" do
      expect(json_response["data"]["users"]).to eq([user_data])
    end
  end
end
