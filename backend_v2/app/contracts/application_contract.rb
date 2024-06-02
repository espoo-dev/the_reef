# frozen_string_literal: true

class ApplicationContract < Dry::Validation::Contract
  config.messages.default_locale = :en
  config.messages.backend = :i18n

  # rubocop:disable Rails/DeprecatedActiveModelErrorsMethods
  def self.call(args)
    instance = new.call(args)

    if instance.errors.messages.any?
      error_message = instance.errors.to_h.values.flatten.join(", ")
      raise InvalidContractError, error_message
    end

    instance.to_h
  end
  # rubocop:enable Rails/DeprecatedActiveModelErrorsMethods
end
