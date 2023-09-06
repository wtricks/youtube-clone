/**
 * Convert timestamp into humen readable string.
 * @param {number} timestamp 
 * @returns 
 */
export const convertTimeStampToHumenReadableTime = (timestamp) => {
    const currentDate = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((currentDate - date) / 1000);
    
    if (seconds < 60) {
        return seconds + " seconds ago";
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return hours === 1 ? "1 hour ago" : hours + " hours ago";
    } else if (seconds < 2592000) {
        const days = Math.floor(seconds / 86400);
        return days === 1 ? "1 day ago" : days + " days ago";
    } else if (seconds < 31536000) {
        const months = Math.floor(seconds / 2592000);
        return months === 1 ? "1 month ago" : months + " months ago";
    } else {
        const years = Math.floor(seconds / 31536000);
        return years === 1 ? "1 year ago" : years + " years ago";
    }
}

export const formatNumber = (number) => {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + 'b';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + 'm';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + 'k';
    } else {
        return number;
    }
}

/**
 * Requesr for application data
 * @param {string} path 
 * @param {object} params 
 * @returns 
 */
export const API = async (path, params) => {
    path += "?";

    for(let key in params) {
        path += `&${key}=${params[key]}`;
    }

    try {
        const e = await fetch(`https://www.googleapis.com/youtube/v3/${path}&key=AIzaSyCP79dpRf5oV93HWsSCgFl58FOIvvpydEw`);
        return await e.json();
    } catch (err) {
        console.log(err);
    }
}

const parseDuration = (duration) => {
    // const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const match =  duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const seconds = parseInt(match[3]) || "00";

    let time = "";
    if (hours) {
        time += ":" + hours;
    }

    if (minutes) {
        time += ":" + minutes;
    }

    time += ":" + seconds;
    return time.slice(1);
}

const template = document.createElement("template");
export const createVideoCard = async (container, d, extra = ' flex-row') => {
    const { snippet: data } = d;
    const channel = await API('channels', { part: 'snippet', id: data.channelId })
    const channelLogo = channel.items[0].snippet.thumbnails.medium.url;

    template.innerHTML = `<div class="video-card card border-0 d-flex${extra}">
        <a href="./video.html?id=${d.id}&user=${data.channelId}" title="${data.title}" class="card-header position-relative">
            <img src="${data.thumbnails.medium.url}" alt="${data.title}">
            <time>${parseDuration(d.contentDetails.duration)}</time>
        </a>

        <div class="card-body d-flex align-items-start">
            <a class="avatar" href="./profile.html?id=${data.channelId}" title="${data.channelTitle}">
                <img src="${channelLogo}" class="rounded-full" style="border-radius:50%" alt="${data.channelTitle}">
            </a>
            <div class="info w-100 text-white">
                <h5>${data.title}</h5>
                <span>${data.channelTitle}</span>
                <span>${formatNumber(d.statistics.viewCount)} Views. ${convertTimeStampToHumenReadableTime(data.publishedAt)}</span>
            </div>
        </div>
    </div>`;

    container.appendChild(template.content.childNodes[0]);
}

/**
 * get query param
 * @param {string} name 
 * @param {string} url 
 * @returns 
 */
export const getParameterByName = (name, url) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
