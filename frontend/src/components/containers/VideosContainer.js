import React, { Component } from 'react';
import CredentialsNav from '../credentialsNav/CredentialsNav';
import './VideosContainer.css'
import FilterSelector from '../videos/FilterSelector';
import Nav from '../nav/Nav';

class VideosContainer extends Component {

    // state = {

    // }

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
                        <h3>
                            Videos
                        </h3>
                        <p>Here are some of the top stock advice videos organized for you.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <FilterSelector />
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