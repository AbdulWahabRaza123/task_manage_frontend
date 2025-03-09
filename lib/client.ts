import axios from "axios";
const client = axios.create({
    baseURL: "https://task-manage-two-silk.vercel.app/api/v1",
});
export { client };