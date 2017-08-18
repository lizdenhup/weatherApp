Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do 
      #/api/v1/search
      get '/search' to: 'forecast#search'
    end 
  end 
end
