import axios from "axios";
import _ from "lodash";

const PROXY_HEXLET_URL = "https://allorigins.hexlet.app/get";
const DEFAULT_FEED_URL = "https://lorem-rss.hexlet.app/feed";

const wrapUrl = (url) => {
    const proxyUrl = new URL(PROXY_HEXLET_URL);
    proxyUrl.searchParams.set('url', url);
    proxyUrl.searchParams.set('disableCache', 'true');
    return proxyUrl;
}

function fetchFeed(url = DEFAULT_FEED_URL) {
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

function parseFeed(content, url) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(content, "text/xml");

        if (xmlDoc.querySelector('parsererror')) {
            throw new Error('Invalid XML content');
        }

        const channel = xmlDoc.querySelector("channel");
        if (!channel) throw new Error('not a valid RSS feed');

        const getTextContent = (element, selector) =>
            element.querySelector(selector)?.textContent || '';

        return {
            feed: {
                title: getTextContent(channel, "title"),
                description: getTextContent(channel, "description"),
                link: getTextContent(channel, "link"),
                url,
            },
            posts: Array.from(xmlDoc.querySelectorAll("item")).map(item => ({
                title: getTextContent(item, "title"),
                description: getTextContent(item, "description"),
                link: getTextContent(item, "link"),
                id: _.uniqueId(),
            })),
        };
    } catch (error) {
        console.error("Parsing error:", error);
        throw error;
    }
}

export default function loadRssFeed(url) {
    return fetchFeed(url)
        .then((content) => parseFeed(content, url));
}

