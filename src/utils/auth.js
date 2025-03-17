import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL + "/api",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
}

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = localStorage.getItem("refresh_token");
                    const VUE_APP_API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
                    const response = await axios.post(`${VUE_APP_API_BASE_URL}api/token/refresh/`, { refresh: refreshToken });

                    // Update tokens
                    localStorage.setItem("access_token", response.data.access);
                    originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;

                    // Retry failed requests
                    onRefreshed(response.data.access);
                } catch (refreshError) {
                    console.error("Refresh token expired, logging out...");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve) => {
                refreshSubscribers.push((newToken) => {
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    resolve(api(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default api;
