require 'rails_helper'

RSpec.describe OnOffValuePolicy do
  subject { described_class.new(user, on_off_value) }

  let(:on_off_value) { build(:on_off_value) }
  let(:owner_user) { on_off_value.on_off_actuator.aquarium.user }

  context 'when user is not owner' do
    let(:user) { build(:user) }

    it { is_expected.to forbid_all_actions }
  end

  context 'when user is owner' do
    let(:user) { owner_user }

    it { is_expected.to permit_all_actions }
  end
end
