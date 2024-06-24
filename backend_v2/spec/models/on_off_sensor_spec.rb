# frozen_string_literal: true

require "rails_helper"

RSpec.describe OnOffSensor do
  describe "relationships" do
    it { is_expected.to belong_to(:aquarium) }
    it { is_expected.to have_one(:on_off_actuator).dependent(:destroy) }
    it { is_expected.to have_many(:on_off_values).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:publish_data_to_server_interval) }
    it { is_expected.to validate_inclusion_of(:sensor_type).in_array(["water_level"]) }
  end

  describe "scopes" do
    describe ".by_user" do
      let(:user) { create(:user) }
      let(:sensor) { create(:on_off_sensor, user:) }

      before { create(:on_off_sensor) }

      it "returns sensors for the given user" do
        expect(described_class.by_user(user)).to match([sensor])
      end

      it "returns an empty result when the user has no sensors" do
        new_user = create(:user)
        expect(described_class.by_user(new_user)).to be_empty
      end
    end
  end
end
