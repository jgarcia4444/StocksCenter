class UserVideosController < ApplicationController
    def create
        puts 'Video Favorited'
    end

    def destroy
        puts 'Video unfavorited'
        user_id = params[:user_video][:user_id]
        video_id = params[:user_video][:video_id]
        video_to_be_removed = UserVideo.find_by(:user_id => user_id, :video_id => video_id)
        if video_to_be_removed 
            video_to_be_removed.destroy
            render :json => {video_id: video_id, message: "The video at video_id: #{video_id} has been removed from the users favorites."}
        end
    end
end