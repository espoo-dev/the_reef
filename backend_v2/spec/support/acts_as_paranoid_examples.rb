# frozen_string_literal: true

# spec/support/acts_as_paranoid_examples.rb
RSpec.shared_examples "acts_as_paranoid" do |model_class|
  let!(:record) { create(model_class.name.underscore.to_sym) }

  describe "acts_as_paranoid" do
    it "soft deletes the record" do
      record.destroy
      expect(record.reload).to be_deleted
      expect(model_class.with_deleted.find(record.id)).to eq(record)
    end

    it "does not include soft deleted records in default scope" do
      record.destroy
      expect(model_class.all).not_to include(record)
    end

    it "includes soft deleted records with with_deleted scope" do
      record.destroy
      expect(model_class.with_deleted).to include(record)
    end

    it "restores a soft deleted record" do
      record.destroy
      record.recover
      expect(model_class.all).to include(record)
      expect(record.reload.deleted_at).to be_nil
    end
  end
end
