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

  describe "scopes" do
    describe ".by_user" do
      let!(:user) { create(:user) }
      let!(:other_user) { create(:user) }
      let!(:aquarium) { create(:aquarium, user: user) }
      let!(:other_aquarium) { create(:aquarium, user: other_user) }
      let!(:sensor) { create(:on_off_sensor, aquarium: aquarium) }
      let!(:other_sensor) { create(:on_off_sensor, aquarium: other_aquarium) }
      let!(:on_off_value) { create(:on_off_value, on_off_sensor: sensor, on_off_actuator: nil) }
      let!(:other_on_off_value) { create(:on_off_value, on_off_sensor: other_sensor, on_off_actuator: nil) }

      it "returns on_off_values for the given user" do
        expect(described_class.by_user(user)).to include(on_off_value)
        expect(described_class.by_user(user)).not_to include(other_on_off_value)
      end

      it "does not return on_off_values for other users" do
        expect(described_class.by_user(other_user)).to include(other_on_off_value)
        expect(described_class.by_user(other_user)).not_to include(on_off_value)
      end

      it "returns an empty result when the user has no on_off_values" do
        new_user = create(:user)
        expect(described_class.by_user(new_user)).to be_empty
      end
    end
  end
end
