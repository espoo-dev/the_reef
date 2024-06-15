# frozen_string_literal: true

# == Schema Information
#
# Table name: embedded_servers
#
#  id          :bigint           not null, primary key
#  deleted_at  :datetime
#  mac_address :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  aquarium_id :bigint           not null
#
# Indexes
#
#  index_embedded_servers_on_aquarium_id  (aquarium_id)
#
# Foreign Keys
#
#  fk_rails_...  (aquarium_id => aquaria.id)
#
FactoryBot.define do
  factory :embedded_server do
    sequence(:name) { |n| "embedded_server#{n}" }
    sequence(:mac_address) { |n| "mac_address#{n}" }
    aquarium
  end
end
