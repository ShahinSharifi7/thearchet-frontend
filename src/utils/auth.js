import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL + "api",
});

// Attach Authorization Header if Token Exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh Token Logic
let isRefreshing = false;
let refreshSubscribers = [];

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

function onRefreshed(newToken) {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
}

// Handle Response Errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) {
                console.warn("No refresh token found. Logging out.");
                logoutUser();
                return Promise.reject(error);
            }

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const response = await axios.post(
                        `${process.env.VUE_APP_API_BASE_URL}api/token/refresh/`,
                        { refresh: refreshToken }
                    );

                    const newAccessToken = response.data.access;
                    const newRefreshToken = response.data.refresh || refreshToken;

                    localStorage.setItem("access_token", newAccessToken);
                    localStorage.setItem("refresh_token", newRefreshToken);

                    isRefreshing = false;
                    onRefreshed(newAccessToken);

                    // Retry the failed requests
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error("Refresh token expired or invalid. Logging out...");
                    logoutUser();
                    return Promise.reject(refreshError);
                }
            }

            // Queue requests until token refresh completes
            return new Promise((resolve) => {
                addRefreshSubscriber((newToken) => {
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    resolve(api(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

function logoutUser() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
}

export default api;
