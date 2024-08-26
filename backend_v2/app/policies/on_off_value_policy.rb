# frozen_string_literal: true

class OnOffValuePolicy < OwnerPolicy
  def create?
    owner?
  end
end
