import axios from 'axios'
import { END_POINT } from '../config'

export async function adminList() {
  try {
    let response = await fetch(`${END_POINT}/api/admin/`, {
      method: 'GET',
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }

}