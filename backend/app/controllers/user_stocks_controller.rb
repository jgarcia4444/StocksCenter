class UserStocksController < ApplicationController 
    def create
        puts 'Tracked Stock added'
        UserStock.create(user_id: params[:user_id], stock_symbol: params[:user_stock][:stock_symbol])
        user_stocks = UserStock.all
        render :json => user_stocks
    end
    def destroy
        puts 'Tracked stock removed from tracked stocks.'
    end
end