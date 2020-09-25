class SessionController < ApplicationController

    def get_user
        puts "There should be a session user id here: #{session[:user_id]}"
        if session[:user_id]
            user = User.find(session[:user_id])
            render :json => user
        else
            render :json => {message: "No current user"}
        end
    end

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
        user_email = params[:email]
        potential_user = User.find_by(:email => user_email)
        if potential_user
            pass = params[:password]
            if potential_user.authenticate(pass)
                render :json => potential_user
            else
                render :json => {message: "Incorrect password."}
            end
        else
            render :json => {message: "No user found with this email."}
        end
    end


    private 
        def user_params
            params.require(:session).permit(:first_name, :last_name, :email, :password)
        end
end