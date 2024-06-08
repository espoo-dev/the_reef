# frozen_string_literal: true

require "rails_helper"

RSpec.describe RangeSensor do
  describe "relationships" do
    it { is_expected.to belong_to(:aquarium) }
    it { is_expected.to have_one(:on_off_actuator).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:publish_data_to_server_interval) }
    it { is_expected.to validate_presence_of(:min_value) }
    it { is_expected.to validate_presence_of(:max_value) }

    describe "min_value" do
      context "when min_value is bigger than max_value" do
        it "is not valid" do
          range_sensor = build(:range_sensor, min_value: 10, max_value: 5)
          expect(range_sensor).not_to be_valid
          expect(range_sensor.errors[:min_value]).to include("must be less than 5.0")
        end
      end

      context "when min_value is smaller than max_value" do
        it "is valid" do
          range_sensor = build(:range_sensor, min_value: 5, max_value: 10)
          expect(range_sensor).to be_valid
        end
      end
    end

    describe "max_value" do
      context "when max_value is bigger than min_value" do
        it "is valid" do
          range_sensor = build(:range_sensor, min_value: 5, max_value: 10)
          expect(range_sensor).to be_valid
        end
      end

      context "when max_value is smaller than min_value" do
        it "is not valid" do
          range_sensor = build(:range_sensor, max_value: 5, min_value: 10)
          expect(range_sensor).not_to be_valid
          expect(range_sensor.errors[:max_value]).to include("must be greater than 10.0")
        end
      end
    end

    it "validates that max_value is greater than min_value" do
      range_sensor = build(:range_sensor, min_value: 5, max_value: 10)
      expect(range_sensor).to be_valid
    end
  end
end
