import axios from "axios";

const getBaseUrl = () => {
    const envSources = [
        import.meta.env.VITE_API_BASE_URL,
        import.meta.env.VITE_APP_URL,
    ];

    for (const url of envSources) {
        if (url && isValidUrl(url)) {
            return url.endsWith("/") ? url.slice(0, -1) : url;
        }
    }
    throw new Error("No valid base URL configured");
};

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const http = axios.create({
    baseURL: `${getBaseUrl()}/api`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === "ERR_NETWORK") {
            return Promise.reject(
                new Error(
                    "Network error - please check your internet connection"
                )
            );
        }

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    window.location.href = "/login";
                    break;
                case 403:
                    return Promise.reject(
                        new Error(
                            "You are not authorized to perform this action"
                        )
                    );
                case 404:
                    return Promise.reject(
                        new Error("The requested resource was not found")
                    );
                case 500:
                    return Promise.reject(
                        new Error("Server error - please try again later")
                    );
                default:
                    return Promise.reject(
                        error.response.data?.message || error.message
                    );
            }
        }

        return Promise.reject(error);
    }
);

export default http;
