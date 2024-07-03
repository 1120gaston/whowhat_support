import React, { useEffect, useState } from 'react'
import userImg from '../../images/avatar.jpg'
import { Button } from 'antd'
import { comments } from '../../api/api_article'
import auth from '../auth/authHelper'
import { read } from '../../api/api_user'
import moment from 'moment'
import { END_POINT } from '../../config'

const BlogComment = ({ blogData, setBlogData }) => {

    const [user, setUser] = useState()
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        read({ id: jwt.id }, { t: jwt.token }).then((data) => {
            data && setUser(data)
        })
    }, [])
    const [comment, setComment] = useState({
        feed: '',
        userName: '',
        subject: '',
        file: ''
    })

    const handleClick = (e) => {
        e.preventDefault()
        comments(blogData._id, comment, jwt.id).then((data) => {
            data && setBlogData(data)
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setComment({ ...comment, 'userName': user?.fullName, 'file': user?.file, [name]: value })
    }

    return (
        <div className='mx-3' style={{ marginTop: '7rem' }}>
            <h5 className="mb-5" style={{ fontWeight: '900' }}>COMMENTS</h5>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }} className='pb-5'>
                {blogData?.comments?.map((item, index) => (
                    <div className='d-flex gap-3 mb-3' key={index + 5}>
                        <div>
                            <img src={`${END_POINT}/uploads/${item?.file ? item?.file : 'avatar.png'}`} width={80} className='' alt='user imge' />
                        </div>
                        <div>
                            <div className='mb-2'>
                                <h6>{item?.userName}</h6>
                                <p className='form-text mb-0'>{moment(item?.created).format('LL')}</p>
                            </div>
                            <p className='form-text'>
                                {item?.feed}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {
                blogData?.postedBy?._id !== jwt.id && <div className="mx-auto" style={{ marginTop: '7rem', marginBottom: '7rem' }}>

                    <div className="card mb-5 p-3 shadow border-0">
                        <form className="row form-row">
                            <div className="col-md-12">
                                <div className="form-group mb-2 card-label">
                                    <label>Full Name</label>
                                    <input placeholder='Full Name' defaultValue={user?.fullName} className="form-control" disabled />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group mb-2 card-label">
                                    <label>Subject</label>
                                    <input placeholder='Subject' className="form-control" name='subject' value={comment.subject} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group mb-2 card-label">
                                    <label>Comment</label>
                                    <textarea placeholder='Your Comment' className="form-control" rows={5} name='feed' value={comment.feed} onChange={handleChange} />
                                </div>
                            </div>

                            <div className='text-center my-3'>
                                <Button htmlType='submit' type="primary" size='large' onClick={handleClick}>
                                    Comment
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            }

        </div>
    )
}

export default BlogComment