import axios, { isAxiosError } from "axios";

export async function registerUser(formData) {
    try {
        const url = "http://localhost:8080/api/auth/register"
        const { data } = await axios.post(url, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function login(formData) {
    try {
        const url = "http://localhost:8080/api/auth/login"
        const { data } = await axios.post(url, formData);
        console.log(data);

        const local = {
            token: data.token,
            email: data.username
        }
        localStorage.setItem("AUTH_TOKEN", JSON.stringify(local))
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}


export async function confirmTokenAccount(formData) {
    try {
        const url = "http://localhost:8080/api/auth/validate-account"
        const { data } = await axios.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function searchAccount(formData) {

    try {
        const url = "http://localhost:8080/api/auth/search-account"
        const { data } = await axios.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function changePasswordAccount(formData) {
    try {
        const url = "http://localhost:8080/api/auth/new-password/" + formData.token;
        const { data } = await axios.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}