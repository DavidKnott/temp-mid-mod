Rails.application.routes.draw do
  root to: "home#index"

  resources :links, only: [:index, :edit, :update]
  resources :users, only: [:new, :create]
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  namespace :api do
    namespace :v1 do
      resources :links, only: [:update, :create]
      resources :top_links, only: [:index]
    end
  end
end
