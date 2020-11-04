class SessionController < ApplicationController

    def signup
        user = User.create(user_params)
        if user.valid?
            user_stocks = user.user_stocks
            if user_stocks.count < 1
                user_stocks = []
            end
            render :json => {user: user, user_stocks: user_stocks}
        else
            errors = user.errors
            render :json => errors
        end
    end

    def login 
        user_email = params[:login_data][:email]
        potential_user = User.find_by(:email => user_email)
        if potential_user
            pass = params[:login_data][:password]
            if potential_user.authenticate(pass)
                user_stocks = potential_user.user_stocks
                render :json => {user: potential_user, user_stocks: user_stocks}
            else
                render :json => {key: "PASS", message: "Incorrect password."}
            end
        else
            render :json => {key: 'EMAIL',message: "No user found with this email."}
        end
    end


    private 
        def user_params
            params.require(:session).permit(:first_name, :last_name, :email, :password)
        end
end