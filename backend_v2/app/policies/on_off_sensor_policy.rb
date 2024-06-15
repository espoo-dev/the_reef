# frozen_string_literal: true

class OnOffSensorPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  class Scope < Scope
    def resolve
      scope.by_user(user)
    end
  end
end
