# frozen_string_literal: true

module Api
  module Client
    module V1
      class ApplicationController < ActionController::API
        before_action :set_paper_trail_whodunnit
      end
    end
  end
end
