# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Mutations::CreateUser" do
  let(:email) { "user@email.com" }
  let(:password) { "password" }

  context "when users does not exist" do
    let(:do_request) { post "/graphql", params: { query: query(email:, password:) } }
    let(:json_response) { response.parsed_body }

    it "creates a user" do
      expect do
        do_request
      end.to change(User, :count).by(1)
    end

    it "returns user data" do
      do_request
      expect(json_response["data"]["createUser"]).to match(
        {
          "id" => anything,
          "email" => email
        }
      )
    end
  end

  context "when users does exist" do
    let(:do_request) { post "/graphql", params: { query: query(email:, password:) } }
    let(:json_response) { response.parsed_body }

    before do
      create(:user, email:, password:)
    end

    it "raises an error" do
      expect do
        do_request
      end.to raise_error(ActiveRecord::RecordInvalid, "Validation failed: Email has already been taken")
    end
  end

  def query(email:, password:)
    <<~GQL
      mutation {
        createUser(
          input: {
            email: "#{email}",
            password: "#{password}"
          }
        ) {
          id
          email
        }
      }
    GQL
  end
end
