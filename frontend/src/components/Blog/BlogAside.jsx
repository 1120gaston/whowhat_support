import React from 'react'
import Search from 'antd/es/input/Search'
import { DatePicker } from 'antd'
import './index.css'
import { blogType } from '../../constant'

const BlogAside = ({ setSearchTerm, setType, setDateRange }) => {

    const handleChange = (e) => {
        setType(e.target.value)
    }

    const handleDateChange = (dates, dateStrings) => {
        setDateRange(dates) // Set the selected date range
    }

    return (
        <div className='p-3' style={{ background: '#f8f9fa' }}>
            <div className="mb-4">
                <h5 className="blog-title">SEARCH</h5>
                <Search placeholder="Search By Blog Title" onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "100%" }} />
                <div className="form-group mb-2 card-label mt-3">
                    <h5 className="blog-title">Blog Type : </h5>
                    <select style={{ width: '100%', padding: '9px', border: 'solid 1px #ddd', borderRadius: '5px' }} defaultValue="All" onChange={handleChange}>
                        {blogType.map((title, index) => (
                            <option key={index} value={title}>{title}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='mb-3'>
                <h6 style={{ color: '#05335c' }}>Date Range</h6>
                <DatePicker.RangePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    onChange={handleDateChange}
                />
            </div>
        </div>
    )
}

export default BlogAside
