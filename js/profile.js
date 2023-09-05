import { getParameterByName, API, formatNumber, createVideoCard, convertTimeStampToHumenReadableTime } from "./helper.js";

window.addEventListener('DOMContentLoaded', () => {
    const userId = getParameterByName("id", window.location.href);

    const container = document.querySelector(".video-section");
    const loader = document.querySelector(".video-section .video-loader");
    
    // fetch channel info
    API('channels', { part: 'snippet,contentDetails,statistics', id: userId })
        .then(d => {
            document.querySelector(".user-info").innerHTML = `<img style="border-radius:50%" src="${d.items[0].snippet.thumbnails.default.url}" alt="${d.items[0].snippet.title}">
            <div>
                <h3>${d.items[0].snippet.title}</h3>
                <p>${formatNumber(d.items[0].statistics.subscriberCount)} subscribers</p>
            </div>`;
            
            const featuredVideo = d.items[0].contentDetails.relatedPlaylists.uploads;
            if (!featuredVideo) return;

            API('playlistItems', { part: 'snippet,contentDetails', playlistId: featuredVideo })
                .then(d => {
                    const data = d.items[0];
                    if (!data) return;

                    document.querySelector(".featured").innerHTML = `
                    <div class="box" style="border:0">
                        <img src="${data.snippet.thumbnails.medium.url}" alt="${data.title}">
                    </div>
                    <div class="d-block" style="padding-left:20px">
                        <h4>${data.snippet.title}</h4>
                        <span>4k views . ${convertTimeStampToHumenReadableTime(data.snippet.publishedAt)}</span>
                        <p>${data.snippet.description.slice(0, 400)}...</p>
                    </div>`;
                })
        });

    // fetch videos
    API('search', {
        type: 'video',
        maxResults: 20,
        chart: 'mostPopular',
        channelId: userId
    })
        .then(data => {
            const videoIds = data.items.map((video) => video.id.videoId);

            // we need some additional information about videos
            return API('videos', { id: videoIds.join(','), part: 'snippet,statistics,contentDetails' })
        })
        .then(data => {
            data.items.forEach((item) => createVideoCard(container, item, ''));
            loader.style.display = 'none'
        });
    // fetch featured video
});