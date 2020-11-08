import React, {Component} from 'react';

class VideoFeedContainer extends Component {

    constructor(props) {
        super(props)

    }

    renderVideos = () => {
        console.log("Hello World")
    }

    render() {

        return (
            <div>
                {this.renderVideos()}
            </div>
            
        )
    }
}

export default VideoFeedContainer