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
            errorMessage: "",
            videoFrame: undefined
        }
    }

    componentDidMount() {
        if (this.videoIsLiked()) {
            this.setState({
                ...this.state,
                isLiked: true
            })
        }
        
        this.loadiFrameVideo()

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

    loadiFrameVideo = () => {
        const api_key = process.env.REACT_APP_YOUTUBE_API_KEY
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=player&id=${this.state.videoId}&key=${api_key}`)
            .then(res => res.json())
            .then(data => {
                if (data.items.length > 0) {
                    let { player } = data.items[0]
                    let parser = new DOMParser()
                    let doc = parser.parseFromString(player.embedHtml, 'text/html')
                    let iFrame = doc.body.firstChild
                    let videoDetails = {
                        height: iFrame.height,
                        width: iFrame.width,
                        src: iFrame.src
                    }
                    this.setState({
                        ...this.state,
                        videoDetails: videoDetails
                    })
                }
            })
    }

    render() {

        const { id, snippet } = this.props.video

        return (
            <div className="row video-container">
                <div className="col-12">
                    <div className="row video-title-row text-center">
                        <div className="col-12 video-title">
                            {snippet.title}
                        </div>
                    </div>
                    <div className="row video-thumbnail-row text-center">
                        <div className="col-12 video-col">
                            { this.state.videoDetails ? 
                                <iframe className="video" width={this.state.videoDetails.width} height={this.state.videoDetails.height} src={this.state.videoDetails.src}></iframe> 
                                :
                                <img src={snippet.thumbnails.medium.url} alt="youtube video thumbnail" />
                            }
                            
                        </div>
                    </div>
                    <div className="row like-video-row text-center">
                        <div className="col-4">
                            <button onClick={() => this.handleLikeClick(id.videoId)} type="button" className={this.state.isLiked ? "like-button btn btn-danger" : "like-button btn btn-light" } >{this.state.isLiked ? "Unlike" : "Like"}</button>
                        </div>
                        <div className="col-8 video-description">
                            {snippet.description}
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