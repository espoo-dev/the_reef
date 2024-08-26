require 'rails_helper'

RSpec.describe UserPolicy do
  subject { described_class.new(user, target_user) }


  context 'when user is not admin' do
    let(:user) { build(:user) }

    context 'when target_user is not admin' do
      let(:target_user) { build(:user) }

      it { is_expected.to permit_only_actions(%i[create]) }
      it { is_expected.to forbid_only_actions(%i[index]) }
    end

    context 'when target_user is admin' do
      let(:target_user) { build(:user, :admin) }

      it { is_expected.to forbid_all_actions }
    end
  end

  context 'when user is admin' do
    let(:user) { build(:user, :admin) }

    context 'when target_user is not admin' do
      let(:target_user) { build(:user) }

      it { is_expected.to permit_all_actions }
    end

    context 'when target_user is admin' do
      let(:target_user) { build(:user, :admin) }

      it { is_expected.to permit_all_actions }
    end
  end
end
