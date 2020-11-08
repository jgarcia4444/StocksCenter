import React from 'react';

const VideoFeedError = (props) => {

    let {error} = props

    return (
        <h3>
            {error}
        </h3>
    )

}

export default VideoFeedError