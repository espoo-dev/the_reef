# frozen_string_literal: true

require "rails_helper"

RSpec.describe OnOffActuator do
  describe "relationship" do
    it { is_expected.to belong_to(:aquarium) }
    it { is_expected.to belong_to(:on_off_sensor) }
    it { is_expected.to belong_to(:range_sensor) }
    it { is_expected.to have_many(:current_on_off_values).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:publish_data_to_server_interval) }
    it { is_expected.to validate_presence_of(:embedded_actuator_pin) }
  end
end
