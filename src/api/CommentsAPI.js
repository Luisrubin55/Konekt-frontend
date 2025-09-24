import api from "../lib/axios"

export async function createCommentByPostId(formData) {
    const content = {
        content: formData.content
    }
    console.log(formData);
    console.log(content)
    try {
        const url = "/comment/"+formData.postId
        const {data} = await api.post(url, content);
        console.log(data);
        
    } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}


export async function getAllCommentsPostId(idPost) {
    try {
        const url = `/comment/`+idPost;
        const { data } = await api.get(url)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updateCommentById(formData) {
    const content = {
        content: formData.content
    }
    try {
        const url = `/comment/`+formData.id;
        const { data } = await api.patch(url, content)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deleteCommentoById(idComment) {
    try {
        const url = `/comment/`+idComment;
        const { data } = await api.delete(url)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}