class SessionController < ApplicationController

    def signup
        User.create(user_params)
        users = User.all
        render :json => users
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