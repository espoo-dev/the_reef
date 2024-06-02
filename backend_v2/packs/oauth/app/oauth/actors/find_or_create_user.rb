# frozen_string_literal: true

module Oauth
  module Actors
    class FindOrCreateUser < Actor
      ALLOWED_PROVIDERS_HASH = {
        github: "github",
        strava: "strava"
      }.freeze

      input :auth, type: OmniAuth::AuthHash

      output :user, type: User

      def call
        self.user = find_or_create_with_oauth_provider(auth)

        fail!(error: :invalid_user) unless user.persisted?
      end

      private

      def find_or_create_with_oauth_provider(auth)
        oauth_provider = auth.provider || auth.oauth_provider

        case oauth_provider
        when ALLOWED_PROVIDERS_HASH[:github]
          find_or_create_user(auth, ALLOWED_PROVIDERS_HASH[:github], auth.info.email)
        when ALLOWED_PROVIDERS_HASH[:strava]
          find_or_create_user(auth, ALLOWED_PROVIDERS_HASH[:strava], strava_generated_email(auth))
        else
          fail!(error: :invalid_oauth_provider)
        end
      end

      # :reek:UtilityFunction
      def strava_generated_email(oauth_provider)
        "#{oauth_provider.uid}@strava_unknown_email.com"
      end

      def find_or_create_user(oauth_provider_data, oauth_provider, email)
        self.user = User.where(
          oauth_provider: oauth_provider,
          oauth_uid: oauth_provider_data.uid
        ).first_or_create do |user|
          user.email = email
          user.password = Devise.friendly_token[0, 20]
        end
      end
    end
  end
end
