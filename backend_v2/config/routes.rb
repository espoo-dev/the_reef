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
    resources :numeric_values

    root to: "users#index"
  end
  mount Sidekiq::Web => "/sidekiq"
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  namespace :api, defaults: { format: :json } do
    namespace :client do
      namespace :v1 do
        resources :users, only: %i[index create]
        resources :on_off_sensors, only: %i[index]
        resources :range_sensors, only: %i[index]
        resources :on_off_actuators, only: %i[index]
        resources :aquaria, only: %i[index]
        post "on_off_numeric_values/seed_data", to: "on_off_numeric_values#seed_data",
          as: "on_off_numeric_values_seed_data"
      end
    end
    namespace :embedded do
      namespace :v1 do
        resources :on_off_values, only: %i[create]
        resources :numeric_values, only: %i[create]
      end
    end
  end

  devise_for :users, controllers: { omniauth_callbacks: "oauth/controllers/omniauth_callbacks" }

  devise_scope :user do
    post "/api/client/v1/tokens", to: "devise/api/tokens#sign_in", as: "api_client_v1_sign_in_user_token"
    post "/api/client/v1/tokens/info", to: "devise/api/tokens#info", as: "api_client_v1_info_user_token"
  end
end
