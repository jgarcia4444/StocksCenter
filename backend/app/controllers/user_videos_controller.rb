class UserVideosController < ApplicationController
    def create
        puts 'Video Favorited'
    end

    def destroy
        puts 'Video unfavorited'
    end
end