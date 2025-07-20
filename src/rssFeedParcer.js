import axios from "axios";

const PROXY_HEXLET_URL = "https://allorigins.hexlet.app/get";
const DEFAULT_FEED_URL = "https://lorem-rss.hexlet.app/feed";

const wrapUrl = (url) => {
    const proxyUrl = new URL(PROXY_HEXLET_URL);
    proxyUrl.searchParams.set('url', url);
    proxyUrl.searchParams.set('nocache', true);
    return proxyUrl;
}


export default (url=DEFAULT_FEED_URL) => {
    const parser = new DOMParser();
    
    // new URL()
    return axios.get(wrapUrl(url))
        .then((response) => {
            const xmlDoc = parser.parseFromString(response.data.contents, "text/xml");
            const parseError = dom.querySelector('parsererror');
            if (parseError) {
            // ошибка парсинга (это не xml)
            }

            const channel = xmlDoc.querySelector("channel"); // этого может не быть. Валидный xml, но не rss
            return {
                feed: {
                    // url: 
                    title: channel.querySelector("title").textContent,
                    description: channel.querySelector("description").textContent,
                    link: channel.querySelector("link").textContent,
                },
                posts: Array.from(xmlDoc.querySelectorAll("item")).map((item) => ({
                    title: item.querySelector("title").textContent,
                    description: item.querySelector("description").textContent,
                })),
            };
        })
        .catch((error) => {
            // ошибка соединения
            console.error("Ошибка:", error);
            throw error;
        });
};

// разделить на запрос(проверка на статус) и на парсинг
// в парсинге проверки: тип(xml), на поля(содержание)
//


function parse(content) {

}