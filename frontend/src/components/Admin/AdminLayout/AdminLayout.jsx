import React from 'react'
import AdminSidebar from '../../UI/AdminSidebar'
import AdminHeader from '../../UI/AdminHeader'
import './AdminLayout.css'
const AdminLayout = ({ children }) => {
    return (
        <div className="main-wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <h3 className="page-title">Welcome Admin!</h3>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout