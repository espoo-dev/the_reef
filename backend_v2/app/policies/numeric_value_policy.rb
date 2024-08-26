# frozen_string_literal: true

class NumericValuePolicy < OwnerPolicy
  def create?
    owner?
  end
end
