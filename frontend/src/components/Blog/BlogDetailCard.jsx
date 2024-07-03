import React from 'react'
import moment from 'moment'
import { Avatar, Card, Image } from 'antd'
import { FaRegThumbsUp } from 'react-icons/fa'
import { END_POINT } from '../../config'

const { Meta } = Card

const BlogDetailCard = ({ blogData, user, onClick }) => {



  return (
    <Card
      style={{ width: 800 }}
      className='m-5'
      cover={
        <Image
          alt="BlogImage"
          src={`${END_POINT}/uploads/${blogData?.file}`}
        />
      }
    >
      <span className="form-text">{moment(blogData?.createdAt).format('LL')}</span>
      <h6 className="text-start mb-1 text-capitalize" style={{ color: '#05335c' }}>{blogData?.title}</h6>
      <hr className="my-1 p-0" />
      <div className="px-2">
        <p className="form-text text-start text-capitalize">{blogData?.description}</p>
      </div>
      <div className='spaceBetween'>
        <Meta
          avatar={<Avatar src={`${END_POINT}/uploads/${user?.file ? user?.file : 'avatar.png'}`} />}
          title={user?.fullName}
        />
        <span className="p-2 itemCenter"><FaRegThumbsUp onClick={onClick} color="blue" cursor="pointer" /> {blogData?.like} </span>
      </div>
    </Card >
  )
}

export default BlogDetailCard