# frozen_string_literal: true

require "rails_helper"

RSpec.describe NumericValue do
  describe "relationship" do
    it { is_expected.to belong_to(:range_sensor) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:value) }
    it { is_expected.to validate_numericality_of(:value) }
  end

  describe ".outside_of_range" do
    subject { described_class.outside_of_range(range_begin, range_end) }

    let!(:numeric_value_1) { create(:numeric_value, value: 1.1) }
    let!(:numeric_value_2) { create(:numeric_value, value: 2.1) }
    let!(:numeric_value_3) { create(:numeric_value, value: 3.1) }

    context "when all values are in the range" do
      let(:range_begin) { 1.0 }
      let(:range_end) { 3.2 }

      it "returns all values" do
        is_expected.to contain_exactly(numeric_value_1, numeric_value_2, numeric_value_3)
      end
    end

    context "when all values are below range" do
      let(:range_begin) { 3.2 }
      let(:range_end) { 4.0 }

      it "returns empty array" do
        is_expected.to be_empty
      end
    end

    context "when all values are above range" do
      let(:range_begin) { 0.2 }
      let(:range_end) { 1.0 }

      it "returns empty array" do
        is_expected.to be_empty
      end
    end

    context "when some values are in the range" do
      let(:range_begin) { 1.1 }
      let(:range_end) { 3.1 }

      it "returns values in the range" do
        is_expected.to contain_exactly(numeric_value_2)
      end
    end
  end
end
