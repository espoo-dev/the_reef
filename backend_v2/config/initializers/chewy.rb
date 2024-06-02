# frozen_string_literal: true

Chewy.strategy(:atomic)
Chewy.request_strategy = :sidekiq
Chewy.logger = Logger.new($stdout)
Chewy.logger.level = Logger::INFO
Chewy.settings = {
  strategy_config: {
    delayed_sidekiq: {
      latency: 3,
      margin: 2,
      ttl: 60 * 60 * 24,
      reindex_wrapper: lambda { |&reindex|
        ActiveRecord::Base.connected_to(role: :reading) { reindex.call }
      }
    }
  }
}
