

import axios from "axios";

const instance = axios.create({
    baseURL: "https://resume-backend-5uua.onrender.com/",
});

export default instance;