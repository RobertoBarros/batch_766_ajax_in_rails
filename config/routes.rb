Rails.application.routes.draw do
  resources :restaurants, only: [ :index, :show, :destroy ] do
    resources :reviews, only: :create
  end

  root to: 'restaurants#index'
end
