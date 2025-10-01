import api from "../lib/axios"

export async function getUser() {
    try {
        const url = `/user`
        const { data } = await api.get(url)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updatePhotoProfile(formData) {
    try {
        const url = "/user/update-photo-profile"
        const {data}  = await api.patch(url, formData)
        console.log(data);
        
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getPhotosByUser() {
    try {
        const url = "/user/images-user"
        const {data}  = await api.get(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}