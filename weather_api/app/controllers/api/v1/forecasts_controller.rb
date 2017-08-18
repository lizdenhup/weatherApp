class Api::V1::ForecastsController < ApplicationController

    def search
        result = ForecastService.new.get_forecast(params[:query])
        # byebug 
        # result is returning the desired information even though Postman is not
        render :json => result, status: 200, content_type: 'application/json'
    end 

end 