# frozen_string_literal: true

module Oauth
  module Controllers
    class OmniauthCallbacksController < Devise::OmniauthCallbacksController
      def github
        oauth_sign_in
      end

      def strava
        oauth_sign_in
      end

      def oauth_sign_in
        result = Oauth::Actors::FindOrCreateUser.result(auth: omniauth_env)

        if result.success?
          sign_in_and_redirect result.user
        else
          redirect_to new_user_registration_url
        end
      end

      private

      def omniauth_env
        request.env["omniauth.auth"]
      end
    end
  end
end
