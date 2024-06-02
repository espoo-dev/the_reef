# frozen_string_literal: true

class AdminDashboardPolicy < ApplicationPolicy
  def initialize(user, _record)
    @user = user
  end

  def full_access?
    user.admin?
  end
end
