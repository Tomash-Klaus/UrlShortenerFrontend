import apiClient from "./Api.js";

export const getShortPagedData = async (pageNumber, pageSize) => {
    const response = (await apiClient.get(`url?pageSize=${pageSize}&pageNumber=${pageNumber}`));
    return response.data;
}

export const getFullUrlInfoById = async (id) => {
    const response = (await apiClient.get(`url/${id}`));
    return response.data;
}

export const createNewUrl = async (fullUrl) => {
    const response = (await apiClient.post("url", {fullUrl}));
    return response.data;
}

export const deleteUrl = async (id) => {
    const response = (await apiClient.delete(`url/${id}`));
    return response.data;
}


