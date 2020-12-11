import React, { Component } from 'react';
import VideoContainer from './VideoContainer';
import './VideoFeedContainer.css';

class VideoFeedContainer extends Component {

    renderVideoContainers = () => {
        return this.props.videos.map(video => {
            return <VideoContainer key={video.id.videoId} video={video} />
        })
    }

    render() {

        return (
            <div className="video-feed-container container">
                {this.renderVideoContainers()}
            </div>
            
        )
    }
}

export default VideoFeedContainer