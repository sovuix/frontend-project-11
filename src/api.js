import axios from "axios";

const PROXY_HEXLET_URL = "https://allorigins.hexlet.app/get";

const wrapUrl = (url) => {
    const proxyUrl = new URL(PROXY_HEXLET_URL);
    proxyUrl.searchParams.set('url', url);
    proxyUrl.searchParams.set('disableCache', 'true');
    return proxyUrl;
}

export function fetchFeed(url) {
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

