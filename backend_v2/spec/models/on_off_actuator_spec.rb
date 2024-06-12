# frozen_string_literal: true

require "rails_helper"

RSpec.describe OnOffActuator do
  describe "relationship" do
    it { is_expected.to belong_to(:aquarium) }
    it { is_expected.to belong_to(:on_off_sensor).optional }
    it { is_expected.to belong_to(:range_sensor).optional }
    it { is_expected.to have_many(:on_off_values).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:publish_data_to_server_interval) }
    it { is_expected.to validate_presence_of(:embedded_actuator_pin) }

    describe "belongs_to_one_parent" do
      let(:on_off_sensor) { create(:on_off_sensor) }
      let(:range_sensor) { create(:range_sensor) }
      let(:on_off_actuator) { build(:on_off_actuator, on_off_sensor: nil, range_sensor: nil) }

      it "is valid when belonging to either an OnOffSensor or a RangeSensor" do
        on_off_actuator.on_off_sensor = on_off_sensor
        expect(on_off_actuator).to be_valid

        on_off_actuator.on_off_sensor = nil
        on_off_actuator.range_sensor = range_sensor
        expect(on_off_actuator).to be_valid
      end

      it "is not valid when belonging to neither an OnOffSensor nor a RangeSensor" do
        on_off_actuator.on_off_sensor = nil
        on_off_actuator.range_sensor = nil
        on_off_actuator.valid?
        expect(on_off_actuator.errors[:base]).to include("must belong to either an OnOffSensor or an RangeSensor")
      end
    end
  end
end
