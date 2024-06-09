# frozen_string_literal: true

module JsonResponseHelper
  def json_response
    return response.parsed_body if response.parsed_body.is_a?(Array)

    response.parsed_body.with_indifferent_access
  end
end
