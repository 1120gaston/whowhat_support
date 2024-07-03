import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'antd'
import { FaChrome, FaRegNewspaper, FaUserAstronaut } from 'react-icons/fa'

import { navLinkInfo } from '../../constant'
import './AdminSidebar.css'
import { userList } from '../../api/api_user'
import { getBlogs } from '../../api/api_article'

const AdminSidebar = () => {

    const [usernum, setUserNum] = useState(0);
    const [blognum, setBlogNum] = useState(0);
    useEffect(() => {
        let user_num = 0
        let blog_num = 0
        userList().then((data) => {
            if (data) {
                data?.map((item) => (
                    item.viewed === false && user_num++
                ))
                setUserNum(user_num)
            }
        })
        getBlogs({ agree: false }).then((data) => {
            data?.map((item) => (
                item.agree === false && blog_num++
            ))
            setBlogNum(blog_num)
        })
    }, [])

    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>
                        <li className="menu-title">
                            <span>Main</span>
                        </li>
                        <li className='my-3'>
                            <Badge>
                                <Link to='/admin/dashboard'>
                                    <FaChrome /> <span>Dashboard</span>
                                </Link>
                            </Badge>
                        </li>
                        <li className='my-3'>
                            <Badge count={blognum}>
                                <Link to='/admin/newBlogs'>
                                    <FaRegNewspaper /> <span>New Blogs</span>
                                </Link>
                            </Badge>

                        </li>
                        <li className='my-3'>
                            <Badge count={usernum}>
                                <Link to={{
                                    pathname: '/users',
                                }}>
                                    <FaUserAstronaut /> <span>Users</span>
                                </Link>
                            </Badge>
                        </li>
                        <hr />
                        {navLinkInfo.map((item, index) => (
                            <li key={index}>
                                <Link to={item.link}>
                                    {item.icon} <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                        <hr />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar