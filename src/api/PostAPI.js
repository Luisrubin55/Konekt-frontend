import api from "../lib/axios";

export async function getAllPost(){
    try {
        const url = "/random-post"
        const { data } = await api.get(url)
        return data
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function getAllUserPost(){
    try {
        const url = "/post"
        const { data } = await api.get(url)
        return data
        
    } catch (error) {
        console.log(error);
    }
}

export async function createPost(formData) {
    try {
        const { data } = await api.post("/post", formData)
        return data
    } catch (error) {
        console.log(error);
    }
}
