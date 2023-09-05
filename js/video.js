import { getParameterByName, API, formatNumber, convertTimeStampToHumenReadableTime, createVideoCard } from "./helper.js"

window.addEventListener("DOMContentLoaded", () => {
    const videoId = getParameterByName("id", window.location.href);
    const userId = getParameterByName("user", window.location.href);

    const loader = document.querySelector(".video-loader");
    const relatedToVideo = document.querySelector(".related");

    // Add video using ifram
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "border:0;height:100%;width:100%";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allowfullscreen = true;
    iframe.frameBorder = "0";
    document.querySelector(".video-player .box").appendChild(iframe);


    Promise.all([
        API('videos', { part: 'snippet,statistics', id: videoId }),
        API('channels', { part: 'snippet,statistics', id: userId }),
        API('commentThreads', { part: 'snippet', videoId: videoId })
    ]).then(data => {
        const d1 = data[0].items[0];
        const d2 = data[1].items[0];

        const template = `<h5>${d1.snippet.title}</h5>
        <div class="video-info">
            <p>${formatNumber(d1.statistics.viewCount)} views . ${convertTimeStampToHumenReadableTime(d1.snippet.publishedAt)}</p>
            
            <div class="reaction d-flex align-items-center ml-auto">
                <button class="btn icon lg-sc" type="button" style="margin-right: 0;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.77 11H14.54L16.06 6.06C16.38 5.03 15.54 4 14.38 4C13.8 4 13.24 4.24 12.86 4.65L7 11H3V21H7H8H17.43C18.49 21 19.41 20.33 19.62 19.39L20.96 13.39C21.23 12.15 20.18 11 18.77 11ZM7 20H4V12H7V20ZM19.98 13.17L18.64 19.17C18.54 19.65 18.03 20 17.43 20H8V11.39L13.6 5.33C13.79 5.12 14.08 5 14.38 5C14.64 5 14.88 5.11 15.01 5.3C15.08 5.4 15.16 5.56 15.1 5.77L13.58 10.71L13.18 12H14.53H18.76C19.17 12 19.56 12.17 19.79 12.46C19.92 12.61 20.05 12.86 19.98 13.17Z" fill="white"/>
                    </svg>
                </button>
                <span style="font-size: 0.7rem;">${formatNumber(d1.statistics.likeCount)}</span>
            </div>
            <div class="reaction d-flex align-items-center ml-auto">
                <button class="btn icon lg-sc" type="button" style="margin-right: 0;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.0001 4H16.0001H6.57007C5.50007 4 4.59007 4.67 4.38007 5.61L3.04007 11.61C2.77007 12.85 3.82007 14 5.23007 14H9.46007L7.94007 18.94C7.62007 19.97 8.46007 21 9.62007 21C10.2001 21 10.7601 20.76 11.1401 20.35L17.0001 14H21.0001V4H17.0001ZM10.4001 19.67C10.2101 19.88 9.92007 20 9.62007 20C9.36007 20 9.12007 19.89 8.99007 19.7C8.92007 19.6 8.84007 19.44 8.90007 19.23L10.4201 14.29L10.8201 13H9.46007H5.23007C4.82007 13 4.43007 12.83 4.20007 12.54C4.08007 12.39 3.95007 12.14 4.02007 11.82L5.36007 5.82C5.46007 5.35 5.97007 5 6.57007 5H16.0001V13.61L10.4001 19.67ZM20.0001 13H17.0001V5H20.0001V13Z" fill="white"/>
                    </svg>
                </button>
            </div>
            <div class="reaction d-flex align-items-center ml-auto">
                <button class="btn icon lg-sc" type="button" style="margin-right: 0;">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2.63L18.66 9L13 15.37V12V11H12C8.04 11 4.86 12 2.25 14.09C4.09 10.02 7.36 7.69 12.14 6.99L13 6.86V6V2.63ZM12 0V6C4.22 7.13 1.11 12.33 0 18C2.78 14.03 6.44 12 12 12V18L20 9L12 0Z" fill="white"/>
                    </svg>
                </button>
                <span style="font-size: 0.7rem;">Share</span>
            </div>
            <div class="reaction d-flex align-items-center ml-auto">
                <button class="btn icon lg-sc" type="button" style="margin-right: 0;">
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6H16V10H14V6H10V4H14V0H16V4H20V6ZM12 0H0V1H12V0ZM0 5H8V4H0V5ZM0 9H8V8H0V9Z" fill="white"/>
                    </svg>
                </button>
                <span style="font-size: 0.7rem;">Save</span>
            </div>
            <div class="reaction d-flex align-items-center ml-auto">
                <button class="btn icon lg-sc" type="button" style="margin-right: 0;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12C7.5 12.83 6.83 13.5 6 13.5C5.17 13.5 4.5 12.83 4.5 12C4.5 11.17 5.17 10.5 6 10.5C6.83 10.5 7.5 11.17 7.5 12ZM12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5ZM18 10.5C17.17 10.5 16.5 11.17 16.5 12C16.5 12.83 17.17 13.5 18 13.5C18.83 13.5 19.5 12.83 19.5 12C19.5 11.17 18.83 10.5 18 10.5Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="w-100 d-flex align-items-center justify-content-between position-relative profile-info">
            <div class="user-info d-flex align-items-center">
                <img style="border-radius:50%" src="${d2.snippet.thumbnails.default.url}" alt="${d2.snippet.title}">
                <a href="./profile.html?id=${d2.id}">
                    <h3>${d2.snippet.title}</h3>
                    <p>${formatNumber(d2.statistics.subscriberCount)} subscribers</p>
                </a>
            </div>

            <button class="btn btn-sm btn-danger" type="button">Subscribe</button>
        </div>
        <div class="about">
            <p>${d2.snippet.description}</p>
        </div>

        <div class="comments w-100">
            <div class="extra d-flex align-items-center">
                <h2>${formatNumber(d1.statistics.commentCount)} Comments</h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 6H3V5H21V6ZM15 11H3V12H15V11ZM9 17H3V18H9V17Z" fill="white"/>
                </svg>
                <h3>SORT BY</h3>
            </div>

            <div class="comment d-flex w-100">
                <a href="#" class="avatar">
                    <img src="./images/User-Avatar.png" alt="User avatar">
                </a>
                <div class="w-100 input">
                    <input type="text" class="form-control" placeholder="Add a public comment">
                </div>
            </div>
            ${data[2].items.map(current => {
                const data = current.snippet.topLevelComment.snippet;

                return `<div class="comment d-flex w-100">
                <a href="./profile.html?id=${data.authorChannelId.value}" class="avatar" title="${data.authorProfileImageUrl}">
                    <img style="border-radius:50%" src="${data.authorProfileImageUrl}" alt="${data.authorProfileImageUrl}">
                </a>
                <div class="info w-100">
                    <div class="name d-flex align-items-center w-100">
                        <h5>${data.authorDisplayName}</h5>
                        <time>${convertTimeStampToHumenReadableTime(data.publishedAt)}</time>
                    </div>
                    <p>${data.textOriginal}</p>
                    <div class="options w-100 d-flex">
                        <div class="reaction d-flex align-items-center">
                            <button class="btn icon lg-sc" type="button" style="margin-right: 0;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.77 11H14.54L16.06 6.06C16.38 5.03 15.54 4 14.38 4C13.8 4 13.24 4.24 12.86 4.65L7 11H3V21H7H8H17.43C18.49 21 19.41 20.33 19.62 19.39L20.96 13.39C21.23 12.15 20.18 11 18.77 11ZM7 20H4V12H7V20ZM19.98 13.17L18.64 19.17C18.54 19.65 18.03 20 17.43 20H8V11.39L13.6 5.33C13.79 5.12 14.08 5 14.38 5C14.64 5 14.88 5.11 15.01 5.3C15.08 5.4 15.16 5.56 15.1 5.77L13.58 10.71L13.18 12H14.53H18.76C19.17 12 19.56 12.17 19.79 12.46C19.92 12.61 20.05 12.86 19.98 13.17Z" fill="white"/>
                                </svg>
                            </button>
                            <span style="font-size: 0.7rem;">${formatNumber(data.likeCount)}</span>
                        </div>
                        <div class="reaction d-flex align-items-center ml-auto">
                            <button class="btn icon lg-sc" type="button" style="margin-right: 0;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.0001 4H16.0001H6.57007C5.50007 4 4.59007 4.67 4.38007 5.61L3.04007 11.61C2.77007 12.85 3.82007 14 5.23007 14H9.46007L7.94007 18.94C7.62007 19.97 8.46007 21 9.62007 21C10.2001 21 10.7601 20.76 11.1401 20.35L17.0001 14H21.0001V4H17.0001ZM10.4001 19.67C10.2101 19.88 9.92007 20 9.62007 20C9.36007 20 9.12007 19.89 8.99007 19.7C8.92007 19.6 8.84007 19.44 8.90007 19.23L10.4201 14.29L10.8201 13H9.46007H5.23007C4.82007 13 4.43007 12.83 4.20007 12.54C4.08007 12.39 3.95007 12.14 4.02007 11.82L5.36007 5.82C5.46007 5.35 5.97007 5 6.57007 5H16.0001V13.61L10.4001 19.67ZM20.0001 13H17.0001V5H20.0001V13Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                        ${current.totalReplyCount ? `<div class="reaction d-flex align-items-center ml-auto">
                        <span style="font-size: 0.7rem;margin-left: 12px;font-weight: 600;">Reply</span>
                    </div>`: ''} 
                    </div>
                </div>
            </div>`
            }).join("")}
        </div>`;

        const t = document.createElement("template");
            t.innerHTML = template;

        t.content.childNodes.forEach(e => document.querySelector(".video-player").appendChild(e))
        loader.style.display = 'none'
    });

    API('search', {
        type: 'video',
        maxResults: 20,
        q: '',
        chart: 'mostPopular'
    })
        .then(data => {
            const videoIds = data.items.map((video) => video.id.videoId);

            // we need some additional information about videos
            return API('videos', { id: videoIds.join(','), part: 'snippet,statistics,contentDetails' })
        })
        .then(data => {
            data.items.forEach((item) => createVideoCard(relatedToVideo, item, ' flex-row'));
            document.querySelector(".side-loader").style.display = 'none'
        });
})