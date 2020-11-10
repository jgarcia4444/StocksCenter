const unlikeVideo = (id) => {
    return {
        type: "UNLIKE_VIDEO",
        videoId: id
    }
}

export default unlikeVideo;