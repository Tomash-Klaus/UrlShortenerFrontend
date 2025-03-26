import apiClient from "./Api.js";

export const login = async (loginModel) => {
    const response = (await apiClient.post('auth/login', loginModel));
    return response.data;
}