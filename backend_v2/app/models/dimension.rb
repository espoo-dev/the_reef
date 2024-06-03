# frozen_string_literal: true

# == Schema Information
#
# Table name: dimensions
#
#  id          :bigint           not null, primary key
#  deleted_at  :datetime
#  height_cm   :integer
#  length_cm   :integer
#  width_cm    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  aquarium_id :bigint           not null
#
# Indexes
#
#  index_dimensions_on_aquarium_id  (aquarium_id)
#
# Foreign Keys
#
#  fk_rails_...  (aquarium_id => aquaria.id)
#
class Dimension < ApplicationRecord
  belongs_to :aquarium

  validates :height_cm, :width_cm, :length_cm, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
