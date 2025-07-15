import axios from "axios";

//для теста

const url = "https://jsonplaceholder.typicode.com/posts/1";

export default () => {
    return axios.get(url)
        .then((response) => response.data);
};


