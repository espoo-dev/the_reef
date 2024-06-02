# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do
  namespace :admin do
    resources :users

    root to: "users#index"
  end
  extend DemoPackRoutes
  extend OauthRoutes
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" if Rails.env.development?
  post "/graphql", to: "graphql#execute"
  mount Sidekiq::Web => "/sidekiq"
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: %i[index create]
    end
  end
  devise_scope :user do
    post "/api/v1/tokens", to: "devise/api/tokens#sign_in", as: "api_v1_sign_in_user_token"
  end
end
