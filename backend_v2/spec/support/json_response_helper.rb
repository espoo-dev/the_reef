# frozen_string_literal: true

module JsonResponseHelper
  def json_response
    response_body = response.parsed_body
    return response_body if response_body.is_a?(Array)

    response_body.with_indifferent_access
  end
end
