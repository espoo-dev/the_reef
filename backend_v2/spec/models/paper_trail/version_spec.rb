# frozen_string_literal: true

require "rails_helper"

RSpec.describe PaperTrail::Version, versioning: true do
  let(:user) { create(:user, email: "user@email.com") }

  context "when create object in database" do
    it "creates version" do
      expect(user).to be_persisted
      expect(user.versions.count).to eq(1)
    end
  end

  context "when update object in database" do
    let(:update_user) { user.update!(email: "user2@email.com") }
    let(:user_version) { user.versions }
    let(:last_user_version) { user_version.last }
    let(:last_object_version) { PaperTrail.serializer.load(last_user_version.object) }

    before { update_user }

    it { expect(user_version.count).to eq(2) }
    it { expect(last_object_version["email"]).to eq("user@email.com") }
    it { expect(last_object_version["whodunnit"]).to be_nil }
  end
end
