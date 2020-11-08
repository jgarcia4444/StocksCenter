import React from 'react';
import './VideoFeedError.css'

const VideoFeedError = (props) => {

    // More to come different kinds of errors need to be handled.

    let {error} = props
    let { code, message, errors } = error
    if (errors[0].reason === 'quotaExceeded') {
        return (
            <div className="video-feed-error container">
                <h2>
                    Whoops...
                </h2>
                <p className="video-feed-error-message">
                    The videos cannot be loaded at this time due to a limit in the amount of API requests allowed.
                </p>
            </div>
        )
    }

}

export default VideoFeedError