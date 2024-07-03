import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FaTrash } from "react-icons/fa"
import { Badge, Button, Empty, message, } from 'antd'

import { END_POINT } from '../../../config'
import './index.css'
import { truncate } from '../../../utils/truncate'
import { deleteUser } from '../../../api/api_user'

const SearchContent = ({ userData, setUserData }) => {

  console.log("userData:", userData)
  const handleDelete = (id) => {
    deleteUser(id).then((data) => {
      if (data.users) {
        message.success(data.message)
        setUserData(data.users)
      }
    })
  }

  return (
    userData && userData?.length > 0 ?
      <>
        {userData?.map((item, index) => {
          return (
            <div key={index}>
              <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
                <div className='d-flex p-3 '>
                  <div className='d-flex justify-content-around w-100'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                      <img src={`${END_POINT}/uploads/${item?.file ? item.file : 'avatar.png'}`} className="" alt="User Image" />
                    </div>
                    <div className="doc-info">
                      <h4 className='mt-3'><small>Name : </small>{item?.fullName}</h4>
                      <p className='form-text'><small>Gender : </small>{item?.gender}</p>
                      <p className='form-text'><small>Email : </small>{item?.email}</p>
                      <p className='form-text'><small>Phone Number : </small>{item?.mobile}</p>
                      <p className='form-text'><small>Since Member : </small>{moment(item?.created).format('LL')}</p>
                      <p className='form-text'><small>Blog Number :{item?.blogNum} </small></p>
                      <p className='form-text'><small>Social Link : </small>
                        <a className="m-1" href={item?.link} >{truncate(item?.link, 20)}</a>
                      </p>
                    </div>
                  </div>
                  <div className="clinic-booking">
                    <span className='text-danger d-flex justify-content-end' onClick={() => handleDelete(item._id)} style={{ cursor: 'pointer', }}><FaTrash /></span>
                    <Link to={`/profile/${item?._id}`} className="view-pro-btn">
                      {!item.viewed ? <Badge dot={true}>View Profile</Badge> : <>View Profile</>}
                    </Link>
                  </div>
                </div>
              </div>
            </div >
          )
        })}
      </> :
      <Empty />
  )
}
export default SearchContent