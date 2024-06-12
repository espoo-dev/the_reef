# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do
  namespace :admin do
    resources :users
    resources :aquaria
    resources :dimensions
    resources :embedded_servers
    resources :on_off_actuators
    resources :on_off_sensors
    resources :on_off_values
    resources :range_sensors

    root to: "users#index"
  end
  extend OauthRoutes
  mount Sidekiq::Web => "/sidekiq"
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: %i[index create]
      resources :on_off_sensors, only: %i[index]
      resources :range_sensors, only: %i[index]
      resources :aquaria, only: %i[index]
    end
  end
  devise_scope :user do
    post "/api/v1/tokens", to: "devise/api/tokens#sign_in", as: "api_v1_sign_in_user_token"
    post "/api/v1/tokens/info", to: "devise/api/tokens#info", as: "api_v1_info_user_token"
  end
end
