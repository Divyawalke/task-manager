import axios from "axios";

export default axios.create({
  baseURL: "https://task-manager-production-8c34.up.railway.app/api"
});