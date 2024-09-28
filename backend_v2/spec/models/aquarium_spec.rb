# frozen_string_literal: true

require "rails_helper"

RSpec.describe Aquarium do
  subject { create(:aquarium) }

  describe "relationships" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_one(:dimension).dependent(:destroy) }
    it { is_expected.to have_one(:embedded_server).dependent(:destroy) }
    it { is_expected.to have_many(:on_off_sensors).dependent(:destroy) }
    it { is_expected.to have_many(:range_sensors).dependent(:destroy) }
    it { is_expected.to have_many(:on_off_actuators).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id) }
  end

  describe "warning?" do
    subject { aquarium.warning? }

    let(:aquarium) { create(:aquarium) }
    let(:on_off_sensor) { create(:on_off_sensor, aquarium:) }
    let!(:on_off_value) do
      create(:on_off_value, on_off_sensor:, on_off_actuator: nil, value: on_off_value_value)
    end
    let(:on_off_value_value) { false }
    let(:range_sensor) { create(:range_sensor, min_value: 5, max_value: 10, aquarium:) }
    let!(:numeric_value) { create(:numeric_value, range_sensor:, value: numeric_value_value) }
    let(:numeric_value_value) { 6 }

    context "when on_off_sensor.warning? returns false and range_sensor.warning? returns false" do
      it { is_expected.to be(false) }
    end

    context "when on_off_sensor.warning? returns true and range_sensor.warning? returns false" do
      let(:on_off_value_value) { true }

      it { is_expected.to be(true) }
    end

    context "when on_off_sensor.warning? returns false and range_sensor.warning? returns true" do
      let(:numeric_value_value) { 11 }

      it { is_expected.to be(true) }
    end

    context "when on_off_sensor.warning? returns true and range_sensor.warning? returns true" do
      let(:on_off_value_value) { true }
      let(:numeric_value_value) { 11 }

      it { is_expected.to be(true) }
    end
  end
end
