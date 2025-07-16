import axios from "axios";

const PROXY_HEXLET_URL = "https://allorigins.hexlet.app/get?url=";
const DEFAULT_FEED_URL = "https://lorem-rss.hexlet.app/feed";

// export default (url = DEFAULT_FEED_URL) => {
//     const parser = new DOMParser();
//     const proxiedUrl = `${PROXY_HEXLET_URL}${encodeURIComponent(url)}`;

//     return axios.get(proxiedUrl)
//         .then((response) => {
//             const xmlString = response.data.contents;
//             return parser.parseFromString(xmlString, "text/xml");
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// };

export default (url = DEFAULT_FEED_URL) => {
    const parser = new DOMParser();
    const proxiedUrl = `${PROXY_HEXLET_URL}${encodeURIComponent(url)}`;

    return axios.get(proxiedUrl)
        .then((response) => {
            // 1. Достаём XML из ответа прокси
            const xmlString = response.data.contents;
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");

            // 2. Извлекаем данные из RSS (пример для стандартного RSS 2.0)
            const items = xmlDoc.querySelectorAll("item");
            const feedData = Array.from(items).map((item) => ({
                title: item.querySelector("title")?.textContent || "Без названия",
                link: item.querySelector("link")?.textContent || "#",
                description: item.querySelector("description")?.textContent || "",
                pubDate: item.querySelector("pubDate")?.textContent || "",
            }));

            return feedData; // Массив объектов с данными статей
        })
        .catch((error) => {
            console.error("Ошибка при загрузке RSS:", error);
            throw error; // Пробрасываем ошибку для обработки в вызывающем коде
        });
};
