class UserStocksController < ApplicationController 

    def create
        if !params[:user_id]
            render :json => {message: "You must be have an account and be signed in to track a stock."}
        else
            possible_duplicate = UserStock.find_by(user_stocks_params)
            if possible_duplicate
                render :json => {:message => "is already being tracked."}
            else
                user_stock = UserStock.create(user_stocks_params)
                if user_stock
                    user = User.find(params[:user_id])
                    user_stocks = user.user_stocks
                    render :json => {userStocks: user_stocks}
                else 
                render :json => {message: "Unable to save to tracked stocks."} 
                end
            end
            
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