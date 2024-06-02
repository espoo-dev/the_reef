# frozen_string_literal: true

module DemoPack
  module Controllers
    class HelloWorldController < ApplicationController
      before_action :authenticate_user!, only: :private_method

      def public_method
        render plain: "This method does not need authentication"
      end

      def private_method
        render plain: "This method needs authentication"
      end

      def search
        query = search_params[:query]
        users = UsersIndex.query(query_string: { fields: [:email], query: query, default_operator: "and" })
        render json: users.objects.to_json, status: :ok
      end

      private

      def search_params
        params.permit(:query, :page, :per)
      end
    end
  end
end
