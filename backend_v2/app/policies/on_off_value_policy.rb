# frozen_string_literal: true

class OnOffValuePolicy < ApplicationPolicy
  def create?
    user.present? # owner?
  end
end
