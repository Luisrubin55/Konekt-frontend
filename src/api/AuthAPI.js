import axios, { isAxiosError } from "axios";
import api from "../lib/axios"

export async function registerUser(formData) {
    try {
        const url = "/user/register"
        const { data } = await api.post(url, formData);
        return data
    } catch (error) {
        console.log(error);
        
    }
}

export async function login(formData) {
    try {
        const url = "http://localhost:8080/login"
        const { data } = await axios.post(url, formData);
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

export async function getUserByEmail(email) {
    try {
        const url = `/user/${email}`
        const { data } = await api.get(url)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function confirmTokenAccount(formData) {
    try {
        const url = "/user/validate-token"
        const { data } = api.post(url, formData)
        return data
    } catch (error) {
        
    }
}

export async function searchAccount(formData) {
    console.log(formData);
    
    try {
        const url = "/user/search-account"
        const { data } = await api.post(url, formData)
        console.log(data);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}