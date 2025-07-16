import axios from "axios";

//для теста

// const url = "https://jsonplaceholder.typicode.com/posts/1";
const defaultUrl = 'https://lorem-rss.hexlet.app/feed';

export default (url = defaultUrl) => {
    const parser = new DOMParser();
    return axios.get(url)
        .then((response) => response.data)
        .then((xmlString) => parser.parseFromString(xmlString, "text/xml"))
        .catch((error) => {
            console.error('Error:', error);
        });
};


