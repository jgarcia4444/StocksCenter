const likeVideo = (id) => {
    return {
        type: "LIKE_VIDEO",
        videoId: id
    }
}

export default likeVideo;