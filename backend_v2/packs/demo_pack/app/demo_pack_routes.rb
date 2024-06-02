# frozen_string_literal: true

module DemoPackRoutes
  def self.extended(router)
    router.instance_exec do
      get "/public_method", to: "demo_pack/controllers/hello_world#public_method"
      get "/private_method", to: "demo_pack/controllers/hello_world#private_method"
      get "/search", to: "demo_pack/controllers/hello_world#search"

      get "api/v1/public_method", to: "demo_pack/controllers/api/v1/hello_world#public_method"
      get "api/v1/private_method", to: "demo_pack/controllers/api/v1/hello_world#private_method"
    end
  end
end
