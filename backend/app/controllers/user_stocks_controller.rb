class UserStocksController < ApplicationController 

    def create
        possible_duplicate = UserStock.find_by(user_stocks_params)
        if possible_duplicate
            render :json => {:message => "This stock is already being tracked."}
        else
            UserStock.create(user_stocks_params)
            user = User.find(params[:user_id])
            user_stocks = user.user_stocks
            render :json => {userStocks: user_stocks}
        end
        
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

    private 
        def user_stocks_params
            params.permit(:user_id, :stock_symbol)
        end

end