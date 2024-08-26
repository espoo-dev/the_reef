# frozen_string_literal: true

class EmbeddedUserPolicy < ApplicationPolicy
  def initialize(user, _record)
    @user = user
  end

  def embedded_access?
    user.present?
  end
end
