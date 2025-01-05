import { isAxiosError } from "axios"
import api from "../lib/axios"

export async function getProducts() {
    try {
        const { data } = await api('/api/products')
        return data.products
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}