import axios from "axios";

const axiosCurInstance = axios.create();

axiosCurInstance.interceptors.request.use(
    (response) => response,
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosCurInstance;
