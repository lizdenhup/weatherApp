require 'rubygems'
require 'bundler/setup'

require 'faraday_middleware'
require 'faraday/http_cache'
require 'active_support/logger'

class Faraday::OverrideCacheControl < Faraday::Middleware
    def initialize(app, options = {})
      super(app)
      @cache_control = options[:cache_control]
    end
  
    def call(env)
      response = @app.call(env)
      response.headers['Cache-Control'] = @cache_control
      response
    end
end 

class ForecastService
    #not caching as desired - logger says uncacheable. some setting is wrong 
    def get_forecast(zipcode)
        apikey = ENV['WUNDERGROUND_API_KEY']
        @client = Faraday.new do |builder|
            builder.use :http_cache, store: Rails.cache, logger: ActiveSupport::Logger.new(STDOUT)
            builder.adapter Faraday.default_adapter
            builder.use Faraday::OverrideCacheControl, cache_control: 'public, max-age=3600'
        end

        5.times do |index|
            started = Time.now
            puts "Request ##{index + 1}"
            response = @client.get("http://api.wunderground.com/api/#{apikey}/forecast/q/#{zipcode}.json")
            finished = Time.now
            remaining = response.headers['X-RateLimit-Remaining']
            limit = response.headers['X-RateLimit-Limit']
        
            puts "  Request took #{(finished - started) * 1000} ms."
            puts "  Rate limits: remaining #{remaining} requests of #{limit}."
        end
    end 
end 
    
    # def get_forecast(zipcode)
    #     cache_key = zipcode
    #     apikey = ENV['WUNDERGROUND_API_KEY']
    #     api_url = "http://api.wunderground.com/api/#{apikey}/forecast/q/#{cache_key}.json"
    #     # Rails.cache.fetch("#{cache_key}", expires_in: 1.hours) {
    #       @response = Faraday.get("#{api_url}")
    #       JSON.parse(@response.body)
    #       # not ideal - if resp is bad it still gets cached...
    #     # }
    # end    
# end 