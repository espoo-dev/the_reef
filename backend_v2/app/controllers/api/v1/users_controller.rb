# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::V1::ApiController
      skip_before_action :authenticate_devise_api_token!, only: :create

      def index
        users = User.page(page).per(per_page)

        authorize(users)

        render json: users, status: :ok
      end

      def create
        user = User.new(user_create_contract)

        authorize(user)

        user.save!

        render json: user, status: :created
      end

      private

      def index_contract
        @index_contract ||= UserContracts::Index.call(permitted_params(:page, :per_page))
      end

      def user_create_contract
        UserContracts::Create.call(permitted_params(:name, :email, :password))
      end
    end
  end
end
