import React, { Component } from 'react';
import CredentialsNav from '../credentialsNav/CredentialsNav';
import './VideosContainer.css'
import FilterSelector from '../videos/FilterSelector';
import Nav from '../nav/Nav';

class VideosContainer extends Component {

    state = {
        filterSelected: "beginner",
        videos: [],
    }

    handleFilterClick = (filter) => {
        this.setState({
            filterSelected: filter
        })
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    componentDidMount() {
        this.fetchVideos()
    }

    fetchVideos = () => {
        const key = process.env.REACT_APP_YOUTUBE_API_KEY
        const query = this.state.filterSelected + " stock advice"
        const url = "https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=" + query + "&key=" + key
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                ...this.state,
                videos: data.items
            }))
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
                        {/* Video feed component */}
                    </div>
                </div>
            </div>
        )
    }

}

export default VideosContainer;