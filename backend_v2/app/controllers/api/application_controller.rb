# frozen_string_literal: true

module Api
  class ApplicationController < ActionController::API
    before_action :set_paper_trail_whodunnit
  end
end
