# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  def create?
    user.admin? || !record.admin?
  end
end
