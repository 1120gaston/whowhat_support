import axios from 'axios'
import { END_POINT } from '../config'

export async function create(params, credentials, blog) {
    try {
        let response = await fetch(`${END_POINT}/api/blog/new/` + params.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t,
                // 'Content-Type': 'multipart/form-data'
            },
            body: blog
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export async function listId(id) {
    try {
        let response = await fetch(`${END_POINT}/api/blog/by/${id}`, {
            method: 'GET',
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}

export async function blogOne(id) {
    try {
        let response = await fetch(`${END_POINT}/api/blog/${id}`, {
            method: 'GET',
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}


export async function getBlogs(params) {
    try {
        let response = await fetch(`${END_POINT}/api/blog/${params.agree}`, {
            method: 'POST',
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}

export async function getDeletedBlogs() {
    try {
        let response = await fetch(`${END_POINT}/api/blog/deletedblog`, {
            method: 'GET',
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



export async function blogUpdate(blogId) {
    try {
        const res = await axios.put(`${END_POINT}/api/blog/blogUpdate`, { blogId: blogId })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function unenergy(params, energy) {
    try {
        const res = await axios.put(`${END_POINT}/api/prayer/unenergy`, { userId: params.userId, energy: energy })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteCard(id, user) {
    try {
        const res = await axios.delete(`${END_POINT}/api/blog/${id}`,
            {
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return res.data
    } catch (error) {
        console.log(error)
    }

}

export async function deleteCard1(id) {
    try {
        const res = await axios.delete(`${END_POINT}/api/blog/admin/${id}`,
            {
                method: 'DELETE'
            }
        )
        return res.data
    } catch (error) {
        console.log(error)
    }

}

export async function deletedBlog(id) {
    try {
        const res = await axios.delete(`${END_POINT}/api/blog/deletedBlog/${id}`,
            {
                method: 'DELETE',
            }
        )
        return res.data
    } catch (error) {
        console.log(error)
    }

}

export async function recentDelete() {
    try {
        let response = await fetch(`${END_POINT}/api/blog/deletedBlog/recent`, {
            method: 'GET',
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}

export async function likeBlog(id) {
    try {
        const res = await axios.put(`${END_POINT}/api/blog/${id}/like`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function unlikeBlog(id) {
    try {
        const res = await axios.put(`${END_POINT}/api/blog/${id}/unlike`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function popBlogs() {
    try {
        let response = await fetch(`${END_POINT}/api/blog/popBlogs`, {
            method: 'GET',
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}

export async function comments(blogId, comment, userId) {
    try {
        const res = await axios.put(`${END_POINT}/api/blog/comment`, { userId: userId, blogId: blogId, comment: comment })
        return res.data
    } catch (error) {
        console.log(error)
    }
}