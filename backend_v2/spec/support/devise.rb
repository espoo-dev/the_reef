# frozen_string_literal: true

module Devise
  # :reek:UtilityFunction
  def auth_headers_for(user)
    Devise::Api::TokensService::Create.new(resource_owner: user).call
    token = Devise::Api::Token.find_by(resource_owner_id: user).access_token

    { "Authorization" => "Bearer #{token}" }
  end

  # :reek:UtilityFunction
  def embedded_auth_headers_for(user)
    mac_address = user.aquaria.sole.embedded_server.mac_address
    {
      "Authorization" => mac_address,
      "mac_address" => mac_address
  }
  end
end

RSpec.configure do |config|
  config.include Devise, type: :request
end
