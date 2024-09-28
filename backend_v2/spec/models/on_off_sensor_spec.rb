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

  describe "#values_count" do
    subject { on_off_sensor.values_count(now - 24.hours, value) }

    let(:now) { Time.zone.now }
    let!(:on_off_sensor) { create(:on_off_sensor) }
    let!(:on_off_value1) do
      create(:on_off_value, on_off_sensor:, on_off_actuator: nil, value: true, created_at: now - 1.hour)
    end
    let!(:on_off_value2) do
      create(:on_off_value, on_off_sensor:, on_off_actuator: nil, value: true, created_at: now - 25.hours)
    end
    let!(:on_off_value3) do
      create(:on_off_value, on_off_sensor:, on_off_actuator: nil, value: false, created_at: now - 1.hour)
    end
    let!(:on_off_value4) do
      create(:on_off_value, on_off_sensor:, on_off_actuator: nil, value: false, created_at: now - 2.hours)
    end
    let!(:on_off_value5) do
      create(:on_off_value, on_off_sensor:, on_off_actuator: nil, value: false, created_at: now - 25.hours)
    end

    context "when value is true" do
      let(:value) { true }

      it "returns only on_off_values with value true from past 24 hours" do
        is_expected.to eq(1)
      end
    end

    context "when value is false" do
      let(:value) { false }

      it "returns only on_off_values with false true from past 24 hours" do
        is_expected.to eq(2)
      end
    end
  end

  describe "#warning?" do
    subject { on_off_sensor.warning? }

    let(:on_off_sensor) { create(:on_off_sensor) }
    let(:now) { Time.zone.now }
    let!(:on_off_value) do
      create(:on_off_value, on_off_sensor:, on_off_actuator: nil, value: true, created_at: now - 24.hours)
    end
    let!(:on_off_value2) do
      create(:on_off_value, on_off_sensor:, on_off_actuator: nil, value:, created_at: now - 2.hours)
    end

    context "when current_on_off_value is true" do
      let(:value) { true }

      it { is_expected.to be(true) }
    end

    context "when current_on_off_value is false" do
      let(:value) { false }

      it { is_expected.to be(false) }
    end
  end
end
