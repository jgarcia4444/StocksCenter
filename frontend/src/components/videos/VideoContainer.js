import React, { Component } from 'react';
import './VideoContainer.css';

class VideoContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // Liked state tracker.
        }
    }

    render() {

        const { id, snippet } = this.props.video

        return (
            <div className="row video-container">
                <div classnName="col-12">
                    <div className="row video-title-row">
                        <div className="col-12 video-title">
                            {snippet.title}
                        </div>
                    </div>
                    <div className="row video-description-row">
                        <div className="col-12 video-description">
                            {snippet.description}
                        </div>
                    </div>
                    <div className="row video-thumbnail-row">
                        <div className="col-12 video-thumbnail">
                            <img src={snippet.default.url}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default VideoContainer;