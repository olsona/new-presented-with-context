# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get "recipes/index"
      post "recipes/create"
      get "/show/:id", to: "recipes#show"
      delete "/destroy/:id", to: "recipes#destroy"

      resources :contexts, only: %i[index create show update destroy]

      resources :wishlists, only: %i[index create show destroy] do
        resources :wishlist_items, only: %i[index create show update destroy]
      end
    end
  end
  root "homepage#index"
  get "/*path" => "homepage#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
