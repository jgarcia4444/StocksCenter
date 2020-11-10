import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VideoContainer.css';
import likeVideo from '../../actions/LikeVideo';
import unlikeVideo from '../../actions/UnlikeVideo';

class VideoContainer extends Component {


    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            videoId: this.props.video.id.videoId,
            hasLikeError: false,
            hasUnlikeError: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        if (this.videoIsLiked()) {
            this.setState({
                ...this.state,
                isLiked: true
            })
        }
    }

    videoIsLiked = () => {
        if (this.props.videoIds !== [] && this.props.videoIds !== undefined) {
            let { videoIds } = this.props
            if (videoIds.includes(this.state.videoId)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    persistLikedVideo = (id) => {
        let userId = this.props.user.id
        let options = {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_video: {
                    video_id: id,
                    user_id: userId
                }
            })
        }
        fetch(`http://localhost:3000/users/${userId}/user_videos`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.saved) {
                    this.props.likeVideo(this.state.videoId)
                } else {
                    // Handle error of either not being able to like due to not being logged in or a duplicate like


                }
            })
    }

    persistUnlikeToVideo = (id) => {
        let userId = this.props.user.id
        let options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_video: {
                    video_id: id,
                    user_id: userId
                }
            })
        }
        fetch(`http://localhost:3000/users/${userId}/user_videos/${id}`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.saved) {
                    // Unlike the video in the redux store
                    this.props.unlikeVideo(data.video_id)
                } else {
                    // Handle error of either not being able to like a video or duplicate like
                }
            })
    }

    handleLikeClick = (videoId) => {
        this.setState({
            ...this.state,
            isLiked: !this.state.isLiked
        })
        if (!this.state.isLiked) {
            this.persistLikedVideo(videoId)
        } else {
            this.persistUnlikeToVideo(videoId)
        }
    }

    render() {

        const { id, snippet } = this.props.video

        return (
            <div className="row video-container">
                <div className="col-12">
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
                            <img src={snippet.thumbnails.default.url}/>
                        </div>
                    </div>
                    <div className="row like-video-row">
                        <div className="col-4">
                            <button onClick={() => this.handleLikeClick(id.videoId)} type="button" className={this.state.isLiked ? "like-button btn btn-danger" : "like-button btn btn-light" } >{this.state.isLiked ? "Unlike" : "Like"}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser,
        videoIds: state.userVideoIds
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likeVideo: (id) => dispatch(likeVideo(id)),
        unlikeVideo: (id) => dispatch(unlikeVideo(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoContainer);