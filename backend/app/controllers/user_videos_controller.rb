class UserVideosController < ApplicationController
    def create
        puts 'Video Favorited'
        new_user_video = UserVideo.create(user_videos_params)
        if new_user_video
            render :json => {new_user_video: new_user_video, message: "Video Liked and change persisted."}
        end
    end

    def destroy
        puts 'Video unfavorited'
        user_id = params[:user_video][:user_id]
        video_id = params[:user_video][:video_id]
        video_to_be_removed = UserVideo.find_by(:user_id => user_id, :video_id => video_id)
        if video_to_be_removed 
            video_to_be_removed.destroy
            render :json => {video_id: video_id, message: "Video like removed and change persisted."}
        end
    end

    def show
        user = User.find(params[:user_video][:user_id])
        if user
            user_videos = user.user_videos
            if user_videos 
                render :json => { user_videos: user_videos, message: "User liked videos loaded." }
            else
                render :json => { user_videos: [], message: "User has no liked videos." }
            end 
        else
            render :json => { loggedIn: false, message: "User must be logged in to access liked videos." }
        end
    end

    private

    def user_videos_params
        params.require(:user_video).permit(:video_id, :user_id)
    end

end