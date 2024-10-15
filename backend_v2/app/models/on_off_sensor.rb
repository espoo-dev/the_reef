# frozen_string_literal: true

# == Schema Information
#
# Table name: on_off_sensors
#
#  id                              :bigint           not null, primary key
#  deleted_at                      :datetime
#  description                     :string           not null
#  icon_url                        :string
#  name                            :string           not null
#  priority                        :integer
#  publish_data_to_server_interval :datetime         not null
#  sensor_type                     :string
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
  has_one :on_off_actuator, dependent: :destroy
  has_many :on_off_values, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
  validates :publish_data_to_server_interval, presence: true
  validates :sensor_type, presence: true, inclusion: { in: ["water_level"] }

  delegate :user, to: :aquarium

  scope :by_user, lambda { |user|
    joins(:aquarium).where({ aquaria: { user_id: user.id } })
  }

  def current_on_off_value
    on_off_values.order(created_at: :desc).first
  end

  def warning?
    current_on_off_value&.value
  end

  def values_count(after_date, value)
    on_off_values
      .created_after(after_date)
      .where(value:)
      .count
  end
end
