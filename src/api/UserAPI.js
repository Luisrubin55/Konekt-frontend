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