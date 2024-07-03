import axios from 'axios'
import { END_POINT } from '../config'

export async function sendEmail(data) {
    try {
        const response = await axios.post(`${END_POINT}/api/sendEmail`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function verifyEmail(data) {
    try {
        const response = await axios.post(`${END_POINT}/api/sendEmail/verify`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}