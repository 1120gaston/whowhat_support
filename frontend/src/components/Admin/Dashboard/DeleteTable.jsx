import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button, Empty } from 'antd'
import { Pagination, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { deletedBlog, getDeletedBlogs } from '../../../api/api_article'

const DeleteTable = ({ flag, setFlag }) => {

  const [deletedblog, setDeletedBlog] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = deletedblog.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.postedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.deletedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.created.slice(0, 10).includes(searchTerm)
  )

  useEffect(() => {
    getDeletedBlogs().then((data) => {
      data && setDeletedBlog(data)
    })
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handledelete = (id) => {
    deletedBlog(id).then((data) => {
      data && setDeletedBlog(data.blogs)
      setFlag && setFlag(!flag)
    })
  }

  return (
    <div className="row" style={{ marginTop: '50px' }}>
      <div className="col-md-12 d-flex">
        <div className="card card-table flex-fill">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">Delete List</h4>
            <div className="m-1">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                prefix={<SearchOutlined />}
                className="rounded-pill"
              />
            </div>
          </div>
          {
            filteredData && filteredData[0] ? <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th width='15%'>Post User</th>
                      <th width='30%'>Title</th>
                      <th width='15%'>Delete User</th>
                      <th width='20%'>Delete_date</th>
                      <th width='20%'>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Link style={{ color: '#212529' }} to={`/profile/${item?.postedBy}`}>
                            <span>{item.postedUser}</span>
                          </Link>
                        </td>
                        <td>
                          <Link style={{ color: '#212529' }} to={`/blog/${item?.blogId}`}>
                            {item.title}
                          </Link>
                        </td>
                        <td>
                          <Link style={{ color: '#212529' }} to={`/profile/${item?.deletedBy}`}>
                            <span> {item.deletedUser}</span>
                          </Link>
                        </td>
                        <td>{item.created.slice(0, 10)}</td>
                        <td className='d-flex justify-content-between'>
                          ${item.price}
                          <Button className='text-danger' style={{ cursor: 'pointer' }} onClick={() => handledelete(item?._id)}><FaTrash /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredData.length}
                  onChange={handlePageChange}
                  showSizeChanger
                  pageSizeOptions={[5, 10, 20, 50, 100]}
                  className='m-3'
                />
              </div>
            </div> : <Empty />
          }
        </div>
      </div>
    </div>
  )
}

export default DeleteTable