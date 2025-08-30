import axios from "axios";

const PROXY_HEXLET_URL = "https://allorigins.hexlet.app/get";
const DEFAULT_FEED_URL = "https://lorem-rss.hexlet.app/feed";


const wrapUrl = (url) => {
    const proxyUrl = new URL(PROXY_HEXLET_URL);
    proxyUrl.searchParams.set('url', url);
    proxyUrl.searchParams.set('disableCache', 'true');
    return proxyUrl;
}

export function fetchFeed(url = DEFAULT_FEED_URL) {
    return axios.get(wrapUrl(url))
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Invalid response from proxy');
            }
            return response.data.contents;
        })
        .catch(error => {
            throw error;
        });
}

