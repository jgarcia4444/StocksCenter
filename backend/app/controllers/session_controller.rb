class SessionController < ApplicationController

    def signup
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            puts "This is the session id: #{session[:user_id]}"
            render :json => user
        else
            errors = user.errors
            render :json => errors
        end
    end

    def login 
        puts 'logged in !!!!!!!!'
        puts "These are the params: #{params}"
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