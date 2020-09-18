class SessionController < ApplicationController

    def signup
        puts 'Users Controller Reached!!'
        puts '--------------------------'
        User.create(user_params)
        users = User.all
        render :json => users
    end

    def login 
        puts 'logged in !!!!!!!!'
    end


    private 
        def user_params
            params.require(:session).permit(:first_name, :last_name, :email, :password)
        end
end