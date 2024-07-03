import React, { useEffect, useState } from 'react'
import BlogAside from './BlogAside'
import { getBlogs } from '../../api/api_article'
import BlogCard from '../Home/Blog/BlogCard'
import { Pagination } from 'antd'

const BlogBody = ({ showType, userid }) => {
  const [type, setType] = useState('All')
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState([null, null])
  const [blogData, setBlogData] = useState([])
  const [initialBlog, setInitialBlog] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  useEffect(() => {
    getBlogs({ agree: true }).then((data) => {
      if (data) {
        let temp = []
        if (showType === 'profile') {
          data.map((item) => (item.postedBy === userid && temp.push(item)))
          setBlogData(temp)
          setInitialBlog(temp)
        } else {
          data.map((item) => (item.agree === true && temp.push(item)))
          setBlogData(temp)
          setInitialBlog(temp)
        }
      }
    })
  }, [showType, userid])

  useEffect(() => {
    let temp = initialBlog

    // Filter by type
    if (type !== 'All') {
      temp = temp.filter((item) => item.type === type)
    }

    // Filter by search term
    if (searchTerm) {
      temp = temp.filter((item) => item.title.toUpperCase().includes(searchTerm.toUpperCase()))
    }

    // Filter by date range
    if (dateRange && (dateRange[0] && dateRange[1])) {
      const startDate = new Date(dateRange[0])
      const endDate = new Date(dateRange[1])
      temp = temp.filter((item) => {
        const createdDate = new Date(item.created)
        return createdDate >= startDate && createdDate <= endDate
      })
    }

    setBlogData(temp)
  }, [type, searchTerm, dateRange, initialBlog])

  const paginatedData = blogData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="container-fluid" style={{ marginTop: 150, marginBottom: 100 }}>
      <div className="row">
        <div className="col-md-9 col-sm-12">
          <div className="p-3 pt-5 mx-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="row" >
              <BlogCard blogData={paginatedData} setBlogData={setBlogData} />
            </div>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={blogData.length}
              onChange={handlePageChange}
              showSizeChanger
              onShowSizeChange={handlePageChange}
              pageSizeOptions={[5, 10, 20, 50]}
              style={{ marginTop: '20px', textAlign: 'center' }}
            />
          </div>
        </div>
        <div className="col-md-3 col-sm-12">
          <BlogAside setSearchTerm={setSearchTerm} setType={setType} setDateRange={setDateRange} />
        </div>
      </div>
    </div>
  )
}

export default BlogBody
