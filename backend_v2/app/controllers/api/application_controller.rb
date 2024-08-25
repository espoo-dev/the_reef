# frozen_string_literal: true

module Api
  module Client
    class ApplicationController < ActionController::API
      before_action :set_paper_trail_whodunnit
    end
  end
end
