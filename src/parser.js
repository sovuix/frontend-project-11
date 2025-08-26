import _ from "lodash";
import { fetchFeed } from "./api";

 
function parseFeed(content) {
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

