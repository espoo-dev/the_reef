# frozen_string_literal: true

# All Administrate controllers inherit from this
# `Administrate::ApplicationController`, making it the ideal place to put
# authentication logic or other before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    before_action :authenticate_user!
    before_action :authenticate_admin
    before_action :set_paper_trail_whodunnit

    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

    include Pundit::Authorization
    after_action :verify_authorized

    def authenticate_admin
      authorize :admin_dashboard, :full_access?

      # authorized = AdminDashboardPolicy.new(current_user, nil).send(:admin_dashboard?)
      # raise Pundit::NotAuthorizedError unless authorized
    end

    private

    def user_not_authorized(exception)
      policy_name = exception.policy.class.to_s.underscore
      flash.now[:error] = t "#{policy_name}.#{exception.query}", scope: "pundit", default: :default
      render file: Rails.public_path.join("401.html").to_s, layout: false, status: :unauthorized
    end
  end
end
