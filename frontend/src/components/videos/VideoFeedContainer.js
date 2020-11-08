import React, { Component } from 'react';
import VideoContainer from './VideoContainer';

class VideoFeedContainer extends Component {

    constructor(props) {
        super(props)
        
    }

    renderVideoContainers = () => {
        return this.props.videos.map(video => {
            return <VideoContainer video={video} />
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