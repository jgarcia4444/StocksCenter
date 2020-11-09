import React, { Component } from 'react';
import './VideoContainer.css';

class VideoContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLiked: false
        }
    }

    componentDidMount() {
        // When loaded check redux store if it is part of the liked videos
    }

    handleLikeClick = () => {
        this.setState({
            ...this.state,
            isLiked: !this.state.isLiked
        })
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
                    <div className="row like-video-row">
                        <div className="col-4">
                            <button onClick={this.handleLikeClick} type="button" className={this.state.isLiked ? "like-button btn btn-danger" : "like-button btn btn-light" } >{this.state.isLiked ? "Unlike" : "Like"}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default VideoContainer;