import React from 'react';

const ShowLikedVideos = (props) => {

    // Make a button instead of a toggle

    return(
        <div className="liked-videos-toggle-container">
            <button onClick={props.handleLikedVideosToggle} className={props.className}>{props.textValue}</button>
        </div>
    )
}

export default ShowLikedVideos;

