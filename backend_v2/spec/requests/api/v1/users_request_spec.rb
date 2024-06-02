# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Users" do
  describe "GET /api/v1/users" do
    context "when user authenticated" do
      let(:token) { api_token(user) }

      context "when user is authorized" do
        let!(:user) { create(:user, admin: true) }

        context "when data is valid" do
          before do
            headers = auth_headers_for(user)
            get "/api/v1/users", params: {}, headers:
          end

          it { expect(response.parsed_body.first).to have_key("id") }
          it { expect(response.parsed_body.first).to have_key("email") }
          it { expect(response.parsed_body.first["email"]).to eq(user.email) }
          it { expect(response).to have_http_status(:ok) }
        end

        context "when has pagination via page and per_page" do
          let(:json_response) { response.parsed_body }

          let(:params) do
            {
              page: 2,
              per_page: 5
            }
          end

          before do
            create_list(:user, 8)
            headers = auth_headers_for(user)
            get "/api/v1/users", params:, headers:
          end

          it "returns only 4 users" do
            expect(json_response.length).to eq(4)
          end
        end
      end

      context "when user is unauthorized" do
        let!(:user) { create(:user) }

        before do
          headers = auth_headers_for(user)
          get "/api/v1/users", headers:
        end

        it { expect(response).to have_http_status(:unauthorized) }

        it {
          expect(response.parsed_body["error"]).to eq("not allowed to index? this User::ActiveRecord_Relation")
        }
      end
    end

    context "when user unauthenticated" do
      context "when has user" do
        before do
          get "/api/v1/users"
        end

        it { expect(response).to have_http_status(:unauthorized) }

        it {
          expect(response.parsed_body["error"]).to eq("invalid_token")
        }
      end
    end
  end

  describe "POST /api/v1/users" do
    before do
      post "/api/v1/users", params: user_params, headers:
    end

    context "when user authenticated" do
      let(:headers) { auth_headers_for(user) }
      let!(:user) { create(:user, admin: true) }

      context "when data is valid" do
        let(:user_params) do
          {
            email: "user@email.com",
            password: "password"
          }
        end

        let(:expected_response) do
          { email: user_params[:email], id: anything }
        end

        it { expect(json_response[:id]).not_to be_nil }
        it { expect(json_response).to match(expected_response) }
        it { expect(response).to have_http_status(:created) }
      end

      context "when data is not valid" do
        context "when validation fail" do
          let(:user_params) do
            {
              email: user.email,
              password: "password"
            }
          end

          let(:expected_response) do
            { error: "Validation failed: Email has already been taken" }
          end

          it { expect(json_response).to match(expected_response) }
          it { expect(response).to have_http_status(:unprocessable_entity) }
        end

        context "when parameters are missing" do
          let(:user_params) { {} }

          let(:expected_response) do
            { error: "Email is missing, Password is missing" }
          end

          it { expect(json_response).to match(expected_response) }
          it { expect(response).to have_http_status(:bad_request) }
        end
      end
    end

    context "when user unauthenticated" do
      let(:headers) { {} }

      let(:user_params) do
        {
          email: "user@email.com",
          password: "password"
        }
      end

      it { expect(response).to have_http_status(:created) }
    end
  end
end
