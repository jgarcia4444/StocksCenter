Rails.application.routes.draw do
  post '/signup', to: 'session#signup'
  post '/login', to: 'session#login'
  resources :users, only: [:show]
  resources :users, only: [:show] do
    resources :user_stocks, only: [:create, :destroy]
    resources :user_videos, only: [:create, :destroy, :show, :index]
  end
  get 'get-user', to: 'session#get_user'
end
