import axios from "axios";

const client = axios.create();

client.defaults.xsrfCookieName = "csrftoken";
client.defaults.xsrfHeaderName = "X-CSRFToken";
client.defaults.withCredentials = true;

export default client;
