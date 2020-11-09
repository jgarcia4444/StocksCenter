
const loadUserVideos = (videoIds) => {
    return {
        type: 'LOAD_USER_VIDEOS',
        userVideoIds: videoIds
    }
}