import { isAxiosError } from "axios";
import api from "../lib/axios";

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
        return data
    } catch (error) {
        console.log(error);
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}


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


export async function updatePostUser(postId, formData) {
    
    try {
        const url = "http://localhost:8080/api/post/"+postId;
        formData.delete("postId")
        const { data } = await api.patch(url, formData)
        console.log(data);
        
        return data
    } catch (error) {
        console.log(error);
        
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deltePostById(postId) {
    try {
        const url = "/post/"+postId
        const { data } = await api.delete(url)
        return data
    } catch (error) {
        console.log(error);
        
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deleteImageByPostId(formData) {
    try {
        const url = `/post/${formData.postId}/image/${formData.imageId}`
        const { data } = await api.delete(url)
        return data
    } catch (error) {
        console.log(error);
        
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}


