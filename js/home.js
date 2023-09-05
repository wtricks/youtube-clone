import { API, createVideoCard } from "./helper.js";

window.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector(".video-section");
    const catContainer = document.querySelector(".cat");
    const loader = document.querySelector(".video-loader");

    let lastSelected;
    let pageToken = '';
    let loading = false;
    let query = "";

    catContainer.addEventListener('click', (e) => {
        e.preventDefault();

        const value = e.target.getAttribute('data-id');
        if (!value && value != '') return;

        lastSelected.classList.remove("active");
        e.target.classList.add("active");

        query = value;
        pageToken = '';
        lastSelected = e.target;
        searchVideos();
    });

    const searchVideos = () => {
        loading = true;
        loader.style.display = 'flex';
        if (!pageToken) {
            videoContainer.innerHTML = '';
        }

        API('search', { 
            q: encodeURIComponent(query), 
            type: 'video',
            chart: 'mostPopular',
            maxResults: 20,
            regionCode: 'IN',
            pageToken: pageToken, 
        })
            .then(data => {
                pageToken = data.nextPageToken;
                const videoIds = data.items.map((video) => video.id.videoId);

                // we need some additional information about videos
                return API('videos', { id: videoIds.join(','), part: 'snippet,statistics,contentDetails' })
            })
            .then(data => {
                data.items.forEach((item) => createVideoCard(videoContainer, item, ''));
                loader.style.display = 'none';
                loading = false;
            });
    }

    // sidebar subscriptions channel
    // We are not authenticated and api requires authenctication

    // Top bar categories
    API("videoCategories", { part: 'snippet', regionCode: 'IN', maxResults: 20 })
        .then(data => {
            document.querySelector(".cat-loader").style.display = 'none';

            const items = data.items.reduce((prev, curr) => {
                const { title, channelId } = curr.snippet;
                return prev + `<a href="/index.html?cat=${channelId}" data-id="${title}">${title}</a>`
            }, `<a href="/" class="active">All</a>`);

            catContainer.innerHTML = items;
            lastSelected = catContainer.childNodes[0];
        });

    // Function to handle intersection with the sentinel element
    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !loading) {
                searchVideos();
            }
        });
    }
  
    // Create an Intersection Observer that observes the sentinel element
    const intersectionObserver = new IntersectionObserver(handleIntersection, {
        root: null, 
        rootMargin: "100px", 
        threshold: 0, 
    });
  
    // Start observing the sentinel element
    intersectionObserver.observe(document.getElementById("lastElem"));
});