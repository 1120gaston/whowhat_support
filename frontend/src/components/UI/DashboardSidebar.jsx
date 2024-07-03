import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Image } from 'antd'

import './DashboardSidebar.css'
import { navLinkInfo } from '../../constant'
import { END_POINT } from '../../config'
import auth from '../auth/authHelper'
import { read } from '../../api/api_user'

const DashboardSidebar = () => {
    const [user, setUser] = useState()

    let jwt = auth.isAuthenticated()
    useEffect(() => {
        read({ id: jwt.id }, { t: jwt.token }).then((data) => { data && setUser(data) })
    })

    return (
        <div className="profile-sidebar p-3 rounded">
            <div className="p-2 text-center border-bottom">
                <div className="profile-info text-center">
                    <Image width={100} src={`${END_POINT}/uploads/${user?.file}`} alt="" />
                </div>
            </div>
            <nav className="dashboard-menu">
                <ul className="mobile-menu-nav">
                    {navLinkInfo.map((item, index) => (
                        <li key={index} style={{ fontSize: '18px' }}><NavLink to={item.link} className="nav-link alignCenter">{item.icon}{item.title}</NavLink></li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
export default DashboardSidebar 