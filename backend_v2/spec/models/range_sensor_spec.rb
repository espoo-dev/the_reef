# frozen_string_literal: true

require "rails_helper"

RSpec.describe RangeSensor do
  describe "relationships" do
    it { is_expected.to belong_to(:aquarium) }
    it { is_expected.to have_one(:on_off_actuator).dependent(:destroy) }
    it { is_expected.to have_many(:numeric_values).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:publish_data_to_server_interval) }
    it { is_expected.to validate_presence_of(:min_value) }
    it { is_expected.to validate_presence_of(:max_value) }
    it { is_expected.to validate_inclusion_of(:sensor_type).in_array(["temperature"]) }

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

  describe "#current_numeric_value" do
    let(:range_sensor) { create(:range_sensor) }

    context "when numeric value exists" do
      it "returns the most recent numeric value" do
        create(:numeric_value, range_sensor: range_sensor, created_at: 1.day.ago)
        recent_numeric_value = create(:numeric_value, range_sensor: range_sensor, created_at: 1.hour.ago)

        expect(range_sensor.current_numeric_value).to eq(recent_numeric_value)
      end
    end

    context "when numeric value does not exist" do
      it "returns nil" do
        expect(range_sensor.current_numeric_value).to be_nil
      end
    end
  end

  describe "#numeric_value_on_range?" do
    let(:range_sensor) { create(:range_sensor, min_value: 5, max_value: 10) }

    context "when there is no current numeric value" do
      it "returns false" do
        expect(range_sensor).not_to be_numeric_value_on_range
      end
    end

    context "when current numeric value is within range" do
      it "returns true" do
        create(:numeric_value, range_sensor: range_sensor, value: 7)
        expect(range_sensor).to be_numeric_value_on_range
      end
    end

    context "when current numeric value is out of range because it is bigger" do
      it "returns false" do
        create(:numeric_value, range_sensor: range_sensor, value: 11)
        expect(range_sensor).not_to be_numeric_value_on_range
      end
    end

    context "when current numeric value is out of range because it is smaller" do
      it "returns false" do
        create(:numeric_value, range_sensor: range_sensor, value: 4)
        expect(range_sensor).not_to be_numeric_value_on_range
      end
    end
  end

  describe "#numeric_value_under_range?" do
    let(:range_sensor) { create(:range_sensor, min_value: 5, max_value: 10) }

    context "when there is no current numeric value" do
      it "returns false" do
        expect(range_sensor).not_to be_numeric_value_under_range
      end
    end

    context "when current numeric value is under range" do
      it "returns true" do
        create(:numeric_value, range_sensor: range_sensor, value: 3)
        expect(range_sensor).to be_numeric_value_under_range
      end
    end

    context "when current numeric value is within range" do
      it "returns false" do
        create(:numeric_value, range_sensor: range_sensor, value: 7)
        expect(range_sensor).not_to be_numeric_value_under_range
      end
    end

    context "when current numeric value is over range" do
      it "returns false" do
        create(:numeric_value, range_sensor: range_sensor, value: 11)
        expect(range_sensor).not_to be_numeric_value_under_range
      end
    end
  end

  describe "#numeric_value_over_range?" do
    let(:range_sensor) { create(:range_sensor, min_value: 5, max_value: 10) }

    context "when there is no current numeric value" do
      it "returns false" do
        expect(range_sensor).not_to be_numeric_value_over_range
      end
    end

    context "when current numeric value is under range" do
      it "returns false" do
        create(:numeric_value, range_sensor: range_sensor, value: 3)
        expect(range_sensor).not_to be_numeric_value_over_range
      end
    end

    context "when current numeric value is within range" do
      it "returns false" do
        create(:numeric_value, range_sensor: range_sensor, value: 7)
        expect(range_sensor).not_to be_numeric_value_over_range
      end
    end

    context "when current numeric value is over range" do
      it "returns true" do
        create(:numeric_value, range_sensor: range_sensor, value: 11)
        expect(range_sensor).to be_numeric_value_over_range
      end
    end
  end

  describe "#warning?" do
    subject { range_sensor.warning? }

    let(:range_sensor) { create(:range_sensor, min_value: 5, max_value: 10) }

    context "when there is no current numeric value" do
      it "returns false" do
        is_expected.to be(false)
      end
    end

    context "when current numeric value is within range" do
      it "returns false" do
        create(:numeric_value, range_sensor:, value: 7)
        is_expected.to be(false)
      end
    end

    context "when current numeric value is out of range because it is bigger" do
      it "returns true" do
        create(:numeric_value, range_sensor:, value: 11)
        is_expected.to be(true)
      end
    end

    context "when current numeric value is out of range because it is smaller" do
      it "returns true" do
        create(:numeric_value, range_sensor:, value: 4)
        is_expected.to be(true)
      end
    end
  end
end
