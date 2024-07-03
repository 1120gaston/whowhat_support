import React from 'react'
import { Radio } from 'antd'
import Search from 'antd/es/input/Search'

const SearchSidebar = ({ setSearchTerm, setGender }) => {

  const options = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'All',
      value: 'all',
    },
  ]

  const onSelectGender = (e) => {
    setGender(e.target.value)
  }

  const onSearch = (value) => {
    setSearchTerm(value)
  }
  return (
    <div className="col-md-12 col-lg-4 col-xl-3">

      <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
        <h5 className='text-center mb-3' style={{ color: '#05335c' }}>User Filter</h5>
        <div className="mb-3">
          <Search placeholder="Search By UserName" onSearch={onSearch} enterButton allowClear />
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Gender</h6>
          <div className='d-flex flex-column'>
            <Radio.Group options={options} onChange={onSelectGender} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default SearchSidebar