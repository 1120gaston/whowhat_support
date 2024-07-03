import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import BlogCard from '../../Home/Blog/BlogCard'
import { getBlogs } from '../../../api/api_article'
import './Specialites.css'

const Specialites = () => {
    const [blogData, setBlogData] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        let temp = []
        getBlogs({ agree: true }).then((data) => {
            data?.map((item) => (
                item.agree === false && temp.push(item)
            ))
            setBlogData(temp)
        })
    }, [flag])

    return (
        <AdminLayout >
            <div className="row">
                <BlogCard blogData={blogData} setBlogData={setBlogData} setFlag={setFlag} flag={flag} />
            </div>
        </AdminLayout>
    )
}
export default Specialites 