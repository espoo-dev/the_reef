# frozen_string_literal: true

require "rails_helper"

RSpec.describe Oauth::Actors::FindOrCreateUser, type: :actor do
  describe ".call" do
    context "when oauth_provider is 'github' and user exists" do
      it "is successful" do
        auth = OmniAuth::AuthHash.new(
          provider: "github",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2",
          info: {
            email: "test@email.com",
            name: "Naruto Uzumaki"
          }
        )
        create(
          :user, email: "test@email.com", oauth_provider: "github",
          oauth_uid: "929ef6ef-b11f-38c9-111b-accd67a258b2"
        )

        result = described_class.result(auth: auth)
        expect(result.success?).to be true
      end

      it "doesn't create a new user" do
        auth = OmniAuth::AuthHash.new(
          provider: "github",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2",
          info: {
            email: "test@email.com",
            name: "Naruto Uzumaki"
          }
        )
        create(:user, email: "test@email.com")

        expect { described_class.result(auth: auth) }.not_to change(User, :count)
      end

      it "updates existing user with new info" do
        auth = OmniAuth::AuthHash.new(
          provider: "github",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2",
          info: {
            email: "test@email.com",
            name: "Naruto Uzumaki"
          }
        )
        result = described_class.result(auth: auth)

        expect(result.user.email).to include(auth.info.email)
      end
    end

    context "when oauth_provider is 'github' and user doesn't exist" do
      it "is successful" do
        auth = OmniAuth::AuthHash.new(
          provider: "github",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2",
          info: {
            email: "test@email.com",
            name: "Naruto Uzumaki"
          }
        )
        result = described_class.result(auth: auth)

        expect(result.success?).to be true
      end

      it "creates a new user" do
        auth = OmniAuth::AuthHash.new(
          provider: "github",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2",
          info: {
            email: "test@email.com",
            name: "Naruto Uzumaki"
          }
        )

        expect { described_class.result(auth: auth) }.to change(User, :count).by(1)
      end

      it "creates a new user with auth info" do
        auth = OmniAuth::AuthHash.new(
          provider: "github",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2",
          info: {
            email: "test@email.com",
            name: "Naruto Uzumaki"
          }
        )
        result = described_class.result(auth: auth)

        expect(result.user.email).to include(auth.info.email)
      end
    end

    context "when oauth_provider is 'strava' and user exists" do
      it "is successful" do
        auth = OmniAuth::AuthHash.new(
          provider: "strava",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2"
        )
        result = described_class.result(auth: auth)

        expect(result.success?).to be true
      end

      it "doesn't create a new user" do
        auth = OmniAuth::AuthHash.new(
          provider: "strava",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2"
        )
        email = "#{auth.uid}@strava_unknown_email.com"
        create(:user, email: email)

        expect { described_class.result(auth: auth) }.not_to change(User, :count)
      end
    end

    context "when oauth_provider is 'strava' and user doesn't exist" do
      it "is successful" do
        auth = OmniAuth::AuthHash.new(
          provider: "strava",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2"
        )
        result = described_class.result(auth: auth)

        expect(result.success?).to be true
      end

      it "creates a new user" do
        auth = OmniAuth::AuthHash.new(
          provider: "strava",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2"
        )

        expect { described_class.result(auth: auth) }.to change(User, :count).by(1)
      end

      it "creates a new user with auth info" do
        auth = OmniAuth::AuthHash.new(
          provider: "strava",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2"
        )
        result = described_class.result(auth: auth)

        expect(result.user.email).to include(auth.uid)
      end
    end

    context "when auth attributes is invalid" do
      it "is failure" do
        auth = OmniAuth::AuthHash.new(
          provider: "facebook",
          uid: "923eh6ef-b00f-38c9-222b-addd67a258b2",
          info: {
            email: nil,
            name: "John Doe"
          }
        )
        result = described_class.result(auth: auth)

        expect(result.failure?).to be true
      end
    end

    context "when oauth_provider is unknown" do
      it "fails with an error" do
        auth = OmniAuth::AuthHash.new(
          provider: "unknown_provider",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2",
          info: {
            email: "test@email.com",
            name: "Naruto Uzumaki"
          }
        )
        result = described_class.result(auth: auth)

        expect(result.failure?).to be true
        expect(result.error).to eq(:invalid_oauth_provider)
      end
    end

    context "when auth attributes are empty" do
      it "fails with an error" do
        auth = OmniAuth::AuthHash.new(
          provider: "github",
          uid: "929ef6ef-b11f-38c9-111b-accd67a258b2",
          info: {
            email: nil,
            name: nil
          }
        )
        result = described_class.result(auth: auth)

        expect(result.failure?).to be true
        expect(result.error).to eq(:invalid_user)
      end
    end
  end
end
