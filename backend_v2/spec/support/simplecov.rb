# frozen_string_literal: true

require "simplecov"

SimpleCov.start do
  add_group "Controllers", "app/controllers"
  add_group "Jobs", "app/jobs"
  add_group "Lib", "app/lib"
  add_group "Models", "app/models"
  add_group "Mailers", "app/mailers"

  add_filter "config"
  add_filter %r{^/spec/}
  add_filter "app/channels"
end

SimpleCov.at_exit do
  SimpleCov.result.format!
  exit(1) if SimpleCov.result.covered_percent < 100
end
