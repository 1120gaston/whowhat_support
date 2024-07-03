import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { message } from 'antd'
import { FaLocationArrow, FaEnvelope, FaPhoneAlt, FaUserAlt } from "react-icons/fa"
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import SubHeader from '../Shared/SubHeader'
import { useContactMutation } from '../../redux/api/contactApi'

import './index.css'
import { supportInfo } from '../../constant'

const Contact = () => {
    const [contact, { isLoading, isError, error, isSuccess }] = useContactMutation()
    const { register, handleSubmit, reset } = useForm({})
    const onSubmit = (data) => {
        contact(data)
        reset()
    }

    useEffect(() => {
        if (isSuccess) {
            message.success("Successfully Message Send !")
        }
        if (isError && error) {
            message.error(error?.data?.message)
        }
    }, [isSuccess, isError, error])

    const sideBarInfo = [
        {
            title: 'Full Name',
            name: supportInfo.fullName,
            icon: <FaUserAlt className='icon' />,
        },
        {
            title: 'Location',
            name: supportInfo.address,
            icon: <FaLocationArrow className='icon' />,
        },
        {
            title: 'Email',
            name: supportInfo.email,
            icon: <FaEnvelope className='icon' />,
        },
        {
            title: 'Call',
            name: supportInfo.phone,
            icon: <FaPhoneAlt className='icon' />,
        },
    ]

    return (
        <>
            <Header />
            <SubHeader title="Contact us" subtitle="Let's Have a Talk" />
            <section id="contact" className="contact mt-5 mb-5">
                <div className="container" style={{ marginTop: 80, marginBottom: 120 }}>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="info rounded p-3" style={{ background: '#f8f9fa' }}>
                                {sideBarInfo.map((item, index) => (
                                    <div key={index} className="d-flex mb-2 gap-2">
                                        {item.icon}
                                        <div>
                                            <h4>{item.title} : </h4>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="mb-5 p-2 rounded" style={{ background: '#f8f9fa' }}>
                                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>First Name</label>
                                            <input required {...register("fullName")} className="form-control" placeholder='First Name' />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Email</label>
                                            <input required {...register("email")} type='email' className="form-control" placeholder="Email" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Subject</label>
                                            <input required {...register("subject")} className="form-control" placeholder="Enter your subject" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className='form-label'>Message</label>
                                            <textarea required {...register("text")} className="form-control mb-3" cols="30" rows="10" placeholder="enter your message" />
                                        </div>
                                    </div>

                                    <div className="text-center mt-3 mb-5">
                                        <button disabled={isLoading} type='submit' className="appointment-btn">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact