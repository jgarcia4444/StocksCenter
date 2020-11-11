
const removeDisplayedVideo = (videoId) => {
    return {
        type: "REMOVE_DISPLAYED_VIDEO",
        videoId: videoId
    }
}

export default removeDisplayedVideo;