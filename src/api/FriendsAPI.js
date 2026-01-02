import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function getAllFriendRequest() {
    try {
        const { data } = await api.get("/friend")
        return data
    } catch (error) {
         if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}