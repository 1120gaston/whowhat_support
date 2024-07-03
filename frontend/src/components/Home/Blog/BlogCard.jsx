import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Empty, Image, Modal, message } from "antd"
import moment from "moment"

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from "./PaymentForm"

import { FaBusinessTime, FaCloudversify, FaExclamationCircle, FaRegThumbsUp, FaTrash } from "react-icons/fa"
import { truncate } from "../../../utils/truncate"
import { END_POINT } from "../../../config"
import { blogUpdate, deleteCard, deleteCard1 } from "../../../api/api_article"
import auth from "../../auth/authHelper"
import TextArea from "antd/es/input/TextArea"
import { read } from "../../../api/api_user"

const stripePromise = loadStripe('pk_test_51PXYCHEJMz2NLmkO6sXRQsWl8QP2qIcJcpPu0m7EBm86GO9D5masu4GBJ2Fo9OvzGSxG0Ii8VZnL0ekZmtcYPWhO00In9Vas78')

const BlogCard = ({ blogData, setBlogData, showType, flag, setFlag }) => {

  const jwt = auth.isAuthenticated()
  const [user, setUser] = useState()
  const [reason, setReason] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [payState, setPayState] = useState(false)
  const [isOkButtonDisabled, setIsOkButtonDisabled] = useState(false);

  useEffect(() => {
    read({ id: jwt.id }, { t: jwt.token }).then((data) => {
      data && setUser(data)
    })
  }, [blogData])

  useEffect(() => {
    payState ? setIsOkButtonDisabled(false) : setIsOkButtonDisabled(true)
  }, [payState])

  const handleclick = (id) => {
    blogUpdate(id).then((data) => {
      data && setFlag(!flag)
    })
  }

  const handleCancel = () => {
    user.price === 2 && message.error(`You Can't Delete`)
    setIsModalOpen(false)
  }

  const handeldelete = () => {
    deleteCard(isModalOpen, { userId: jwt.id, comment: reason, price: user.price === 0 ? 20 : 70 }).then((data) => {
      data && setBlogData(data.blogs)
      setIsModalOpen(false)
    })
  }

  const adminDelete = (id) => {
    deleteCard1(id).then((data) => {
      data && setBlogData(data.blogs)
    })
  }

  return (
    blogData && blogData?.length > 0 ?
      <>
        {blogData.map((item, index) => (
          <div className="col-md-4 col-sm-12 mb-5" style={{ maxWidth: '25rem' }} key={item?._id + index}>
            <div className="card shadow text-center border-0 rounded-bottom">
              <div className="flex-column p-0 border-0 d-flex justify-content-center align-items-center" style={{ height: '11rem', overflow: 'hidden' }}>
                <Image src={`${END_POINT}/uploads/${item.file}`} alt="blog Image" className="w-100 h-100 rounded-top image-hover" />
              </div>
              <div className="card-body p-0">
                <div className="p-2">
                  <div className="d-flex" style={{ justifyContent: 'space-around' }}>
                    <div className="d-flex gap-1 text-muted align-items-center justify-content-center">
                      <FaBusinessTime className='form-text' />
                      <span className="form-text">{moment(item?.createdAt).format('LL')}</span>
                    </div>
                    <div className="itemCenter">
                      <span className="p-2 itemCenter"><FaRegThumbsUp color="blue" cursor="pointer" />&nbsp;{item.like} </span>
                    </div>
                  </div>
                  <h6 className="text-start mb-1 text-capitalize" style={{ color: '#05335c' }}>{truncate(item?.title, 60)}</h6>
                  <hr className="my-1 p-0" />
                </div>
                <div className="px-2">
                  <p className="form-text text-start text-capitalize" >{truncate(item?.description, 35)}</p>
                </div>
                <div className="mt-1 mb-3 text-start itemCenter">
                  <Link to={`/blog/${item?._id}`}>
                    <button className="btn btn-link border-0" style={{ color: '#1977cc' }}>Read More</button>
                  </Link>
                  {setFlag && <span className="text-success m-3" style={{ cursor: 'pointer' }} onClick={() => handleclick(item?._id)}><FaCloudversify /> Approve</span>}
                  {showType !== 'home' && !setFlag && <span className="text-danger m-3" style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(item?._id)} ><FaTrash />Delete</span>}
                  {setFlag && <span className="text-danger m-3" style={{ cursor: 'pointer' }} onClick={() => adminDelete(item?._id)} ><FaTrash />Delete</span>}

                  <Modal title={<span className="itemCenter"><FaExclamationCircle />Why are you sure delete this BLOG?</span>}
                    open={isModalOpen ? true : false}
                    onOk={(user?.price < 2 && payState) ? handeldelete : handleCancel}
                    onCancel={handleCancel}
                    okButtonProps={{ disabled: isOkButtonDisabled }}
                  >
                    <hr />
                    <div className="text-danger text-center">
                      <h4 className="text-danger">!!! Tips !!!</h4>
                      <p>
                        Pay fees for information removal requests. The first removal costs 20 euros, and a second removal costs 70 euros. No third removal is allowed. <br />
                        You have {2 - user?.price} chance
                      </p>
                    </div>
                    <TextArea onChange={(e) => setReason(e.target.value)} style={{ height: '100px' }} placeholder="Some descriptions" /> <hr />
                    <Elements stripe={stripePromise}>
                      <PaymentForm price={user?.price} setPayState={setPayState} />
                    </Elements>
                  </Modal>

                </div>
              </div>
            </div>
          </div>
        ))}
      </> :
      <Empty />
  )

}

export default BlogCard