class UsersController < ApplicationController
    def show
        user_id = params[:id]    
        user = User.find(user_id)
        if user
            user_video_ids = user.user_videos.map do |user_video|
                user_video.video_id
            end
            puts "User Video Ids Test!!!!"
            render :json => {
                user: user,
                user_stocks: user.user_stocks,
                user_videos: user_video_ids
            }
        end   
    end
end