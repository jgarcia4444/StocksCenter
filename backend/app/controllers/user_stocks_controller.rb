class UserStocksController < ApplicationController 

    def create
        
        UserStock.create(user_id: params[:user_id], stock_symbol: params[:user_stock][:stock_symbol])
        user_stocks = UserStock.all
        render :json => user_stocks

    end

    def destroy

        user_id = params[:user_stock][:user_id]
        stock_symbol = params[:user_stock][:stock_symbol]
        user_stock_for_deletion = UserStock.find_by(:user_id => user_id, :stock_symbol => stock_symbol)

        if user_stock_for_deletion
            user_stock_for_deletion.destroy
            render :json => {:stock_symbol => stock_symbol, :message => "The stock #{stock_symbol} was removed from the tracked stocks."}
        end

    end

end