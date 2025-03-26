import apiClient from "./Api.js";

export const getRedirectUrl = async (url) => {
    const response = (await apiClient.get(`shorturl/${url}`));
    return response.data;
}
