# frozen_string_literal: true

require "rails_helper"

RSpec.describe CurrentOnOffValue do
  describe "relationship" do
    it { is_expected.to belong_to(:on_off_sensor).optional }
    it { is_expected.to belong_to(:on_off_actuator).optional }
  end

  describe "validations" do
    context "when belongs_to_one_parent" do
      let(:current_on_off_value) { build(:current_on_off_value, on_off_sensor: nil, on_off_actuator: nil) }

      it "is invalid without a parent" do
        current_on_off_value.on_off_sensor = nil
        current_on_off_value.on_off_actuator = nil

        error_message = "must belong to either an OnOffSensor or an OnOffActuator"
        expect(current_on_off_value).not_to be_valid
        expect(current_on_off_value.errors[:base]).to include(error_message)
      end

      it "is valid with an on_off_sensor" do
        current_on_off_value.on_off_sensor = build(:on_off_sensor)
        expect(current_on_off_value).to be_valid
      end

      it "is valid with an on_off_actuator" do
        current_on_off_value.on_off_actuator = build(:on_off_actuator)
        expect(current_on_off_value).to be_valid
      end
    end

    context "when cannot_belong_to_both" do
      let(:current_on_off_value) { build(:current_on_off_value) }

      it "is invalid if belongs to both an on_off_sensor and an on_off_actuator" do
        current_on_off_value.on_off_sensor = build(:on_off_sensor)
        current_on_off_value.on_off_actuator = build(:on_off_actuator)
        expect(current_on_off_value).not_to be_valid
        error_message = "cannot belong to both an OnOffSensor and an OnOffActuator simultaneously"
        expect(current_on_off_value.errors[:base]).to include(error_message)
      end
    end
  end
end
