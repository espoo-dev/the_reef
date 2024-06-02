# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  has_paper_trail
  acts_as_paranoid
end
