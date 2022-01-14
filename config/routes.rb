Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :wordslists
      resources :taglists, param: :tag
    end
  end


  get '*path', to: 'pages#index', via: :all
end
