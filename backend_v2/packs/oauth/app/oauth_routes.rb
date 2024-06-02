# frozen_string_literal: true

module OauthRoutes
  def self.extended(router)
    router.instance_exec do
      devise_for :users, controllers: { omniauth_callbacks: "oauth/controllers/omniauth_callbacks" }
    end
  end
end
