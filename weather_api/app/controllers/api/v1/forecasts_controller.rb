class Api::V1::ForecastsController < ApplicationController

    def search
        result = ForecastService.new.get_forecast(params[:query])
        render :plan => result, status: 200, content_type: 'application/json'
    end 
    
end 