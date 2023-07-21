import axios from "axios";

axios.defaults.baseURL = 'https://dummyjson.com'
axios.defaults.headers.post["Content-Type"] = "application/json"