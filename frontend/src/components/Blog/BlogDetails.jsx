import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import { blogOne, likeBlog, unlikeBlog } from '../../api/api_article'
import { read } from '../../api/api_user'
import auth from '../auth/authHelper'
import BlogDetailCard from './BlogDetailCard'
import BlogComment from './BlogComment'

const BlogDetails = () => {
    const { id } = useParams()
    const [blogData, setBlogData] = useState({})
    const [user, setUser] = useState({})
    const [key, setKey] = useState(false)
    const jwt = auth.isAuthenticated()
    useEffect(() => {
        const fetchBlogData = async () => {
            await blogOne(id).then((data) => {
                data && read({ id: data.postedBy._id }, { t: auth.isAuthenticated().token }).then((userData) => {
                    setUser(userData)
                })
                setBlogData(data)
            })
        }
        fetchBlogData()
    }, [id, key])

    const handleLike = (id) => {
        setKey(!key)
        !key ? likeBlog(id).then((data) => { }) : unlikeBlog(id).then((data) => { })
    }

    return (
        <>
            <Header />
            <Container className="container-fluid" style={{ marginTop: 150 }}>
                {/* <div className="d-flex justify-content-end">
                    <div className="col-md-5 col-lg-4 ml-lg-0 text-end text-md-end">
                        <h5 className="text-dark rounded d-inline me-2">Share On </h5>
                        <a className="btn btn-outline-primary btn-floating m-1" >
                            <FaFacebookSquare />
                        </a>
                        <a className="btn btn-outline-primary btn-floating m-1">
                            <FaInstagramSquare />
                        </a>
                        <a className="btn btn-outline-primary btn-floating m-1">
                            <FaLinkedin />
                        </a>
                    </div>
                </div> */}
                <div className='itemCenter'>
                    <BlogDetailCard blogData={blogData} user={user} onClick={() => handleLike(id)} />
                </div>
                <BlogComment blogData={blogData} setBlogData={setBlogData} />
                {/* <Button onClick={() => handleLike(id)}>agree</Button> */}
            </Container>
            <Footer />
        </>
    )
}

export default BlogDetails