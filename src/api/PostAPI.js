import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function getAllPost(){
    try {
        const url = "/post/random-post"
        const { data } = await api.get(url)
        return data
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getAllUserPost(){
    try {
        const url = "/post"
        const { data } = await api.get(url)
        return data
        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function createPost(formData) {
    try {
        const { data } = await api.post("/post", formData)
        return data
    } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function createPostWithImage(formData) {
    try {
        const url = "/post/createPostImage"
        const { data } = await api.post(url, formData)
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}
