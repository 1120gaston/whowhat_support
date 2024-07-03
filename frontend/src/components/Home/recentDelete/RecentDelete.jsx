import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Badge, Button, Empty } from 'antd'
import { Pagination, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { recentDelete } from '../../../api/api_article'
import { Container } from 'react-bootstrap'

const DeleteTable = () => {

  const [deletedblog, setDeletedBlog] = useState([])

  useEffect(() => {
    recentDelete().then((data) => {
      data && setDeletedBlog(data)
    })
  }, [])


  return (
    <Container>
      {
        deletedblog && deletedblog[0] ? <div className="row" style={{ marginTop: '50px' }}>
          <div className="col-md-12 d-flex">
            <div className="card card-table flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title">Recent Deleted List</h4>
              </div>
              <div className="card-body">
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
                      {deletedblog?.map((item, index) => (
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
                            $20.00
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> : <Empty />
      }
      <div className="my-6 itemCenter p-3" style={{ background: '#f8f9fa', marginBottom: '50px' }}>
        <Link to={'/deletedBlogs'} className='more-btn m-3'>See More Deleted Blogs</Link>
      </div>
    </Container>
  )
}

export default DeleteTable