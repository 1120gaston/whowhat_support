import React, { useEffect, useState } from 'react'
import { FaBlog } from 'react-icons/fa'

import AdminLayout from '../AdminLayout/AdminLayout'
import DeleteTable from './DeleteTable'
import { adminList } from '../../../api/api_admin'
import './Dashboard.css'

const AdminDashboard = () => {

    const [adminInfo, setAdminInfo] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        adminList().then((data) => {
            let newAdminInfo = [
                {
                    all: 'All Blogs: ' + data.allBlogs,
                    number: data.allBlogs - data.newBlogs,
                    title: 'Blogs',
                    color: 'primary',
                    progress: ((data.allBlogs - data.newBlogs) / data.allBlogs * 100).toFixed(2) + '%',
                },
                {
                    all: 'All Blogs: ' + data.allBlogs,
                    number: data.newBlogs,
                    title: 'New Blogs',
                    color: 'success',
                    progress: (data.newBlogs / data.allBlogs * 100).toFixed(2) + '%',
                },
                {
                    all: 'All Users: ' + data.allUsers,
                    number: data.allUsers,
                    title: 'Now Users',
                    color: 'danger',
                    progress: (data.allUsers / data.allUsers * 100).toFixed(2) + '%',
                },
                {
                    all: 'USD $',
                    number: '$ ' + data.totalCost,
                    title: 'Revenue',
                    color: 'warning',
                    progress: '100%'
                },
            ]
            setAdminInfo(newAdminInfo)
        })
    }, [flag])

    return (
        <AdminLayout >
            <div className="row">
                {adminInfo.map((item, index) => (
                    <div className="col-xl-3 col-sm-6 col-12" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <div className="dash-widget-header">
                                    <div className={`dash-widget-icon text-${item.color} border-${item.color}`}>
                                        <FaBlog />
                                    </div>
                                    <div className="dash-count">
                                        <h3>{item.all}</h3>
                                    </div>
                                </div>
                                <div className="dash-widget-info">
                                    <h6 className="text-muted">{item.title} : {item.number} --- {item.progress}</h6>
                                    <div className="progress progress-sm">
                                        <div className={`progress-bar bg-${item.color}`} style={{ width: item.progress }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <DeleteTable flag={flag} setFlag={setFlag} />
        </AdminLayout>
    )
}

export default AdminDashboard 