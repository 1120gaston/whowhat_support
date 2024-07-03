import axios from 'axios'
import { END_POINT } from '../config'

export async function createAcount(form) {
    try {
        const res = await axios.post(`${END_POINT}/api/userInfo/tempInfo`, form)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function signGoogle(form) {
    try {
        const res = await axios.post(`${END_POINT}/auth/signin/google`, form)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function signIn(form) {
    try {
        const res = await axios.post(`${END_POINT}/auth/signin`, form)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function signOut() {
    try {
        const res = await axios.post(`${END_POINT}/auth/signout`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function read(params, credentials) {
    try {
        let response = await fetch(`${END_POINT}/api/userInfo/` + params.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t,
                // 'Content-Type': 'multipart/form-data'
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export async function view(params, credentials) {
    try {
        let response = await fetch(`${END_POINT}/api/userInfo/view/` + params.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t,
                // 'Content-Type': 'multipart/form-data'
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export async function update(params, credentials, user) {
    try {
        let response = await fetch(`${END_POINT}/api/userInfo/` + params.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t,
                // 'Content-Type': 'multipart/form-data'
            },
            body: user
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export async function userList() {
    try {
        let response = await fetch(`${END_POINT}/api/userInfo/`, {
            method: 'GET',
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}

export async function popUsers() {
    try {
        let response = await fetch(`${END_POINT}/api/userInfo/popUsers`, {
            method: 'GET',
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}

export async function deleteUser(id) {
    try {
        const res = await axios.delete(`${END_POINT}/api/userInfo/deleteUser/${id}`,
            {
                method: 'DELETE',
            }
        )
        return res.data
    } catch (error) {
        console.log(error)
    }

}