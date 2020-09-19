class UsersController < ApplicationController
    def show
        puts 'This a test from users show action' 
        user_id = params[:id]    
        user = User.find(user_id)
        if user
            render :json => {
                user: user,
                user_stocks: user.user_stocks,
                user_videos: user.user_videos
            }
        end   
    end
end