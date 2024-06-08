# frozen_string_literal: true

# == Schema Information
#
# Table name: on_off_sensors
#
#  id                              :bigint           not null, primary key
#  deleted_at                      :datetime
#  description                     :string           not null
#  name                            :string           not null
#  publish_data_to_server_interval :datetime         not null
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  aquarium_id                     :bigint           not null
#
# Indexes
#
#  index_on_off_sensors_on_aquarium_id  (aquarium_id)
#
# Foreign Keys
#
#  fk_rails_...  (aquarium_id => aquaria.id)
#
class OnOffSensor < ApplicationRecord
  belongs_to :aquarium

  validates :name, presence: true
  validates :description, presence: true
  validates :publish_data_to_server_interval, presence: true
end
