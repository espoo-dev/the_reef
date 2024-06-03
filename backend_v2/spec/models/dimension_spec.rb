# frozen_string_literal: true

require "rails_helper"

RSpec.describe Dimension do
  describe "relationships" do
    it { is_expected.to belong_to(:aquarium) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:height_cm) }
    it { is_expected.to validate_presence_of(:width_cm) }
    it { is_expected.to validate_presence_of(:length_cm) }
    it { is_expected.to validate_numericality_of(:height_cm).only_integer.is_greater_than(0) }
    it { is_expected.to validate_numericality_of(:width_cm).only_integer.is_greater_than(0) }
    it { is_expected.to validate_numericality_of(:length_cm).only_integer.is_greater_than(0) }
  end
end
