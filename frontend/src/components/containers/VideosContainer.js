import React, { Component } from 'react';
import CredentialsNav from '../credentialsNav/CredentialsNav';
import './VideosContainer.css'
import FilterSelector from '../videos/FilterSelector';
import Nav from '../nav/Nav';
import VideoFeedError from '../videos/VideoFeedError';
import VideoFeedContainer from '../videos/VideoFeedContainer';
import ShowLikedVideos from '../videos/ShowLikedVideos';
import removeDisplayedVideo from '../../actions/RemoveDisplayedVideo';
import loadVideosToDisplay from '../../actions/LoadVideosToDisplay'
import { connect } from 'react-redux';

class VideosContainer extends Component {

    constructor() {
        super()
        this.state = {
            filterSelected: "beginner",
            error: undefined,
            showLikedVideos: false,
            likedButttonClassName: "btn btn-light"
        }
    }

    handleLikedVideosToggle = () => {
        if (this.state.showLikedVideos === false) {
            const api_key = process.env.REACT_APP_YOUTUBE_API_KEY
            const videoIdsString = this.props.userVideoIds.join(",")
            fetch(`https://www.googleapis.com/youtube/v3/videos?part=id,snippet&id=${videoIdsString}&key=${api_key}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    let videos = data.items.map(item => {
                        return {
                            id: {
                                videoId: item.id
                            },
                            snippet: item.snippet
                        }
                    })
                    this.setState({
                        ...this.state,
                        showLikedVideos: true,
                        likedButttonClassName: "btn btn-success"
                    })
                    this.props.loadVideosToDisplay(videos)
            })
        } else {
            this.setState({
                ...this.state,
                showLikedVideos: false,
                likedButttonClassName: "btn btn-light"
            })
            this.props.loadVideosToDisplay([])
        }
        
    }    

    handleFilterClick = (filter) => {
        this.setState({
            filterSelected: filter
        })
        this.fetchVideos(filter)
    }

    fetchVideos = (filter) => {
        const key = process.env.REACT_APP_YOUTUBE_API_KEY
        const query = filter + " stock advice"
        const url = "https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=" + query + "&key=" + key
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        ...this.state,
                        error: data.error
                    })
                } else {
                    this.setState({
                        ...this.state,
                        error: undefined
                    })
                    this.props.loadVideosToDisplay(data.items)
                }
            })
    }

    render() {
        console.log(this.props.videosToBeDisplayed)

        return (
            <div className="container Home">
                <CredentialsNav />
                <div className="row text-center">
                    <div id="web-app-title" className="col">
                        <h1>Stockscenter</h1>
                    </div>
                </div>
                <Nav />
                <div className="row">
                    <div className="col-12" id="video-section-header">
                        <p>Click one option below to get some stock advice videos based on your level of understanding.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <FilterSelector className={this.state.showLikedVideos === true ? "filter-selector hide" : "filter-selector" } handleFilterClick={this.handleFilterClick} />
                    </div>
                    <div className="col-6">
                        <ShowLikedVideos handleLikedVideosToggle={this.handleLikedVideosToggle} className={this.state.likedButttonClassName} textValue={this.state.showLikedVideos === true ? "Unshow Liked" : "Show Liked" } />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.error ? <VideoFeedError error={this.state.error} /> : <VideoFeedContainer videos={this.props.videosToDisplay}/> }
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userVideoIds: state.userVideoIds,
        videosToDisplay: state.videosToDisplay
    }
}

export default connect(
    mapStateToProps,
    { 
        removeDisplayedVideo,
        loadVideosToDisplay
     }
)(VideosContainer);