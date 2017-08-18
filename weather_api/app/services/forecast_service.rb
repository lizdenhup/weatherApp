class ForecastService
    
    def get_forecast(zipcode)
        cache_key = zipcode
        apikey = ENV['WUNDERGROUND_API_KEY']
        api_url = "http://api.wunderground.com/api/#{apikey}/forecast/q/#{cache_key}.json"
        # Rails.cache.fetch("#{cache_key}", expires_in: 1.hours) {
          @response = Faraday.get("#{api_url}")
        byebug 
          JSON.parse(@response.body)
          # not ideal - if resp is bad it still gets cached...
        # }
    end
    
end 