import React, { Component } from 'react';
import CredentialsNav from '../credentialsNav/CredentialsNav';
import './VideosContainer.css'
import FilterSelector from '../videos/FilterSelector';
import Nav from '../nav/Nav';
import VideoFeedError from '../videos/VideoFeedError';
import VideoFeedContainer from '../videos/VideoFeedContainer';

class VideosContainer extends Component {

    constructor() {
        super()
        this.state = {
            filterSelected: "beginner",
            videos: [],
            errorMessage: ""
        }
    }

    

    handleFilterClick = (filter) => {
        this.setState({
            filterSelected: filter
        })
        this.fetchVideos(filter)
    }

    fetchVideos = (filter) => {
        console.log(this.state)
        console.log(filter)
        const key = process.env.REACT_APP_YOUTUBE_API_KEY
        const query = filter + " stock advice"
        const url = "https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=" + query + "&key=" + key
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        ...this.state,
                        errorMessage: data.error.message
                    })
                } else {
                    this.setState({
                        ...this.state,
                        videos: data.items
                    })
                }
            })
    }

    render() {
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
                        <p>Here are some of the top stock advice videos organized for you.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <FilterSelector handleFilterClick={this.handleFilterClick} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.errorMessage !== "" ? <VideoFeedError error={this.state.errorMessage} /> : <VideoFeedContainer videos={this.state.videos}/> }
                    </div>
                </div>
            </div>
        )
    }

}

export default VideosContainer;