# frozen_string_literal: true

require "rails_helper"

RSpec.describe EmbeddedServer do
  describe "relationships" do
    it { is_expected.to belong_to(:aquarium) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:mac_address) }
  end
end
