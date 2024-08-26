# frozen_string_literal: true

class OwnerPolicy < ApplicationPolicy
  attr_reader :user, :record

  def owner?
    record.user == user
  end
end
