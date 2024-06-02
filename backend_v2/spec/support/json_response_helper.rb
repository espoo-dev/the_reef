# frozen_string_literal: true

module JsonResponseHelper
  def json_response
    response.parsed_body.with_indifferent_access
  end
end
