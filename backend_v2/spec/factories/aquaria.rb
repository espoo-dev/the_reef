# frozen_string_literal: true

# == Schema Information
#
# Table name: aquaria
#
#  id         :bigint           not null, primary key
#  deleted_at :datetime
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_aquaria_on_user_id           (user_id)
#  index_aquaria_on_user_id_and_name  (user_id,name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :aquarium do
    sequence(:name) { |n| "aquarium#{n}" }
    user

    trait :with_embedded_server do
      after(:create) do |aquarium|
        create(:embedded_server, aquarium:)
      end
    end

    trait :with_dimension do
      after(:create) do |aquarium|
        create(:dimension, aquarium:)
      end
    end
  end
end
