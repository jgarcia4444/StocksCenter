
const loadVideosToDisplay = (videos) => { 
    return {
        type: "LOAD_VIDEOS_TO_DISPLAY",
        videosToDisplay: videos
    }
}

export default loadVideosToDisplay;