class UserStocksController < ApplicationController 
    def create
        puts 'Tracked Stock added'
    end
    def destroy
        puts 'Tracked stock removed from tracked stocks.'
    end
end