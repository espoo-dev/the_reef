# frozen_string_literal: true

class AquariumPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  class Scope < Scope
    def resolve
      scope.where(user:)
    end
  end
end
