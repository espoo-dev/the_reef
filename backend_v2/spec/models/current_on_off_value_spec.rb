# frozen_string_literal: true

require "rails_helper"

RSpec.describe OnOffValue do
  describe "relationship" do
    it { is_expected.to belong_to(:on_off_sensor).optional }
    it { is_expected.to belong_to(:on_off_actuator).optional }
  end

  describe "validations" do
    context "when belongs_to_one_parent" do
      let(:on_off_value) { build(:on_off_value, on_off_sensor: nil, on_off_actuator: nil) }

      it "is invalid without a parent" do
        on_off_value.on_off_sensor = nil
        on_off_value.on_off_actuator = nil

        error_message = "must belong to either an OnOffSensor or an OnOffActuator"
        expect(on_off_value).not_to be_valid
        expect(on_off_value.errors[:base]).to include(error_message)
      end

      it "is valid with an on_off_sensor" do
        on_off_value.on_off_sensor = build(:on_off_sensor)
        expect(on_off_value).to be_valid
      end

      it "is valid with an on_off_actuator" do
        on_off_value.on_off_actuator = build(:on_off_actuator)
        expect(on_off_value).to be_valid
      end
    end

    context "when cannot_belong_to_both" do
      let(:on_off_value) { build(:on_off_value) }

      it "is invalid if belongs to both an on_off_sensor and an on_off_actuator" do
        on_off_value.on_off_sensor = build(:on_off_sensor)
        on_off_value.on_off_actuator = build(:on_off_actuator)
        expect(on_off_value).not_to be_valid
        error_message = "cannot belong to both an OnOffSensor and an OnOffActuator simultaneously"
        expect(on_off_value.errors[:base]).to include(error_message)
      end
    end
  end
end
