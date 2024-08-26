# frozen_string_literal: true

require "rails_helper"

RSpec.describe NumericValuePolicy do
  subject { described_class.new(user, numeric_value) }

  let(:numeric_value) { build(:numeric_value) }
  let(:owner_user) { numeric_value.user }

  context "when user is not owner" do
    let(:user) { build(:user) }

    it { is_expected.to forbid_all_actions }
  end

  context "when user is owner" do
    let(:user) { owner_user }

    it { is_expected.to permit_all_actions }
  end
end
