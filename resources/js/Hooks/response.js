import { useState, useEffect } from "react";
import http from "./http"; // pastikan axios instance di sini

export default function useApi(endpoint, options = { fetchOnMount: true }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await http.get(endpoint, { params });
            const result = response.data?.data ?? response.data;
            setData(result);
            return result;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const post = async (payload, config = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await http.post(endpoint, payload, config);
            const result = response.data?.data ?? response.data;
            setData(result);
            return result;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (options.fetchOnMount && endpoint) {
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
