import { useState, useEffect } from "react";
import http from "./http";

export default function useApi(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = async (params = {}) => {
        try {
            setLoading(true);
            const response = await http.get(`${endpoint}`, {
                params,
            });
            setData(response.data?.data || response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const post = async (payload, config = {}) => {
        try {
            setLoading(true);
            const response = await http.post(`${endpoint}`, payload, config);
            setData((prev) => {
                if (Array.isArray(prev)) {
                    return [...prev, response.data?.data];
                }
                return response.data?.data || response.data;
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (endpoint) {
            get();
        }
    }, [endpoint]);

    return {
        data,
        loading,
        error,
        get,
        post,
        setData,
    };
}
