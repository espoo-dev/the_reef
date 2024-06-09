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
end
