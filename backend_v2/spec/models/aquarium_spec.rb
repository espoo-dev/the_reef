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
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id) }
  end
end
