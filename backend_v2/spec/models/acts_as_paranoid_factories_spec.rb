# frozen_string_literal: true

# spec/models/acts_as_paranoid_factories_spec.rb
require "rails_helper"

RSpec.describe "ApplicationRecord" do
  FactoryBot.factories.each do |factory|
    model_class = factory.build_class

    it_behaves_like "acts_as_paranoid", model_class
  end
end
