# frozen_string_literal: true

require "rails_helper"

RSpec.describe OnOffSensor do
  describe "relationships" do
    it { is_expected.to belong_to(:aquarium) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:publish_data_to_server_interval) }
  end
end
