# frozen_string_literal: true

require "rails_helper"

RSpec.describe "/users/auth/:provider", type: :system do
  let(:mock_email) { "user@company.com" }
  let(:user_email) { mock_email }
  let(:full_name) { "John Doe" }
  let(:after_sign_in_path) { "http://www.example.com:80" }

  describe "/users/auth/github/callback" do
    subject(:do_request) { get user_github_omniauth_callback_path }

    let(:mock_email) { "user@company.com" }

    let(:callback_params) do
      {
        "provider" => "github",
        "uid" => "1234",
        "info" => {
          "email" => mock_email
        }
      }
    end

    before do
      mock_omni_auth(:github, OmniAuth::AuthHash.new(callback_params))
    end

    context "when user does not exists" do
      it "creates user" do
        expect { do_request }.to(change(User, :count).by(1))
      end

      it "redirects to root page" do
        do_request
        expect(response).to redirect_to "/"
      end
    end

    context "when user exists" do
      before { create(:user, email: mock_email, oauth_provider: "github", oauth_uid: "1234") }

      it "does not create user" do
        expect { do_request }.not_to(change(User, :count))
      end

      it "redirects to root page" do
        do_request
        expect(response).to redirect_to "/"
      end
    end

    context "when user has invalid oauth_uid" do
      before { create(:user, email: mock_email, oauth_uid: "invalid") }

      it "does not create user" do
        expect { do_request }.not_to(change(User, :count))
      end

      it "redirects to sign_up page" do
        do_request
        expect(response).to redirect_to "/users/sign_up"
      end
    end
  end

  describe "/users/auth/strava/callback" do
    subject(:do_request) { get user_strava_omniauth_callback_path }

    let(:mock_email) { "user@company.com" }

    let(:callback_params) do
      {
        "provider" => "strava",
        "uid" => "1234",
        "info" => {
          "email" => mock_email
        }
      }
    end

    before do
      mock_omni_auth(:strava, OmniAuth::AuthHash.new(callback_params))
    end

    context "when user does not exists" do
      it "creates user" do
        expect { do_request }.to(change(User, :count).by(1))
      end

      it "redirects to root page" do
        do_request
        expect(response).to redirect_to "/"
      end
    end

    context "when user exists" do
      before { create(:user, email: mock_email, oauth_provider: "strava", oauth_uid: "1234") }

      it "does not create user" do
        expect { do_request }.not_to(change(User, :count))
      end

      it "redirects to root page" do
        do_request
        expect(response).to redirect_to "/"
      end
    end
  end
end
