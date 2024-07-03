import React, { useEffect, useState } from 'react'
import SearchSidebar from './SearchSidebar'
import SearchContent from './SearchContent'
import AdminLayout from '../../Admin/AdminLayout/AdminLayout'
import { userList } from '../../../api/api_user'
import { Pagination } from 'antd'

const SearchDoctor = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [gender, setGender] = useState("all")
    const [userData, setUserData] = useState([])
    const [initialData, setInitialData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    useEffect(() => {
        userList().then((data) => {
            if (data) {
                data = data.reverse()
                setUserData(data)
                setInitialData(data)
            }
        })
    }, [])

    useEffect(() => {
        let temp = []
        gender !== 'all' ? initialData.map((item) => (
            item.gender === gender && temp.push(item)
        )) : temp = initialData
        let newTemp = []
        searchTerm ? temp.map((item) => (
            item?.fullName?.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1 && newTemp.push(item)
        )) : newTemp = temp
        setUserData(newTemp)
        setCurrentPage(1) // Reset to first page on filters change
    }, [gender, searchTerm, initialData])

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    const paginatedData = userData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return (
        <AdminLayout>
            <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
                <div className="container-fluid">
                    <div className="row">
                        <SearchSidebar
                            setSearchTerm={setSearchTerm}
                            setGender={setGender}
                        />
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {userData && <SearchContent userData={paginatedData} setUserData={setUserData} />}
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={userData?.length}
                                onChange={handlePageChange}
                                showSizeChanger
                                onShowSizeChange={handlePageChange}
                                pageSizeOptions={[5, 10, 20, 50]}
                                style={{ marginTop: '20px', textAlign: 'center' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default SearchDoctor
