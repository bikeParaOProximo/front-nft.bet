import axios from "axios";

const local = false;
const url = (local) ? "http://localhost:8080" : "https://back-nftbet-production.up.railway.app/"

const api = axios.create({
  baseURL: url,
})

export default api;