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

    describe ".created_after" do
      subject { described_class.created_after(date) }

      let(:now) { Time.zone.now }
      let!(:on_off_value_1) { create(:on_off_value, created_at: now - 1.minute) }
      let!(:on_off_value_2) { create(:on_off_value, created_at: now) }
      let!(:on_off_value_3) { create(:on_off_value, created_at: now + 1.minute) }

      context "when all values are after date" do
        let(:date) { now - 2.minutes }

        it "returns all values" do
          is_expected.to contain_exactly(on_off_value_1, on_off_value_2, on_off_value_3)
        end
      end

      context "when all values are before date" do
        let(:date) { now + 2.minutes }

        it "returns empty array" do
          is_expected.to be_empty
        end
      end

      context "when some values are before date" do
        let(:date) { now - 1.minute }

        it "returns values in the range" do
          is_expected.to contain_exactly(on_off_value_2, on_off_value_3)
        end
      end
    end
  end
end
