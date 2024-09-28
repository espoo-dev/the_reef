# frozen_string_literal: true

# == Schema Information
#
# Table name: on_off_values
#
#  id                 :bigint           not null, primary key
#  deleted_at         :datetime
#  value              :boolean          default(FALSE), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  on_off_actuator_id :bigint
#  on_off_sensor_id   :bigint
#
# Indexes
#
#  index_on_off_values_on_on_off_actuator_id  (on_off_actuator_id)
#  index_on_off_values_on_on_off_sensor_id    (on_off_sensor_id)
#
# Foreign Keys
#
#  fk_rails_...  (on_off_actuator_id => on_off_actuators.id)
#  fk_rails_...  (on_off_sensor_id => on_off_sensors.id)
#
class OnOffValue < ApplicationRecord
  belongs_to :on_off_sensor, optional: true
  belongs_to :on_off_actuator, optional: true

  validates :value, inclusion: { in: [true, false] }
  validate :belongs_to_one_parent
  validate :cannot_belong_to_both

  scope :by_user, lambda { |user|
                    joins(on_off_sensor: { aquarium: :user }).where(users: { id: user.id })
                  }

  scope :created_after, lambda { |date|
    where("created_at > ?", date)
  }

  def user
    on_off_sensor&.user || on_off_actuator&.user
  end

  private

  def possible_parents
    [on_off_sensor, on_off_actuator]
  end

  def belongs_to_one_parent
    return if possible_parents.any?(&:present?)

    errors.add(:base, "must belong to either an OnOffSensor or an OnOffActuator")
  end

  def cannot_belong_to_both
    return unless possible_parents.all?(&:present?)

    errors.add(:base, "cannot belong to both an OnOffSensor and an OnOffActuator simultaneously")
  end
end
