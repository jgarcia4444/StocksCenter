class UserVideosController < ApplicationController
    def create
        puts 'Video Favorited'
        new_user_video = UserVideo.create(user_videos_params)
        if new_user_video
            render :json => {new_user_video: new_user_video, message: "User favorited video with video_id: #{params[:user_video][:video_id]}"}
        end
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

    private

    def user_videos_params
        params.require(:user_video).permit(:video_id, :user_id)
    end

end