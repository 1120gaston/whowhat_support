import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import SubHeader from '../Shared/SubHeader'
import { popUsers } from '../../api/api_user'
import { END_POINT } from '../../config'

import { data5 } from '../../images'
import './index.css'

const About = () => {

    const [array, setArray] = useState()

    useEffect(() => {
        popUsers().then((data) => {
            data && setArray(data)
        })
    }, [])
    return (
        <>
            <Header />
            <SubHeader title="about us" subtitle="Who Supports What is a platform dedicated to promoting transparency in online interactions. Users can upload and comment on social media interactions, publicly sharing their opinions about individuals." />
            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>Our Website is a multidisciplinary creative studio.</h2>
                            <p className='form-text m-0'>
                                We work together to design, create and produce work that we are proud of for folks that we believe in.
                                We are available for hire in a wide range of creative disciplines for a variety of jobs, projects and gigs.
                                Although we call Downtown Orlando ’home’, we work well with partners from here to Timbuktu.
                                We also believe that great products can come from anywhere.
                                So, we encourage our team to untether, stretch their legs, and explore alternative workspaces.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Our Website's Acheivement</h2>
                            <p className='form-text m-0'>Lifetime license for personal and commercial use. Need Full POD License?</p>
                        </div>
                        <p className='mt-3'>
                            A great website shows the world who you are, makes people remember you, and helps potential customers understand if they found what they were looking for.
                            Websites communicate all of that through color, shape and other design elements.
                            Learn how to make your gallery website tell your brand’s story.
                            Additionally, studying <b>the best products website design</b> can provide valuable insights and inspiration for creating an engaging and effective online presence that resonates with your audience.
                        </p>
                    </div>

                    <div className="col-lg-8">
                        <img src={data5} alt="" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row align-items-center">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Pop Users</h2>
                            <p className='form-text m-0'>Doesn’t matter. We’re too busy thinking far outside of the constraints of the typical brief. Creativity: it’s what drives us. We do our best work when the guardrails are down and we can spread our wings. Designs are cleaner, strategies sharper, and the world generally becomes a better place.</p>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        {
                            array && array[0] ? <div className="row">
                                {array?.map((item, id) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6" key={id + 3}>
                                        <div className='itemCenter'>
                                            <div className="award-img" style={{ backgroundImage: `url(${END_POINT}/uploads/${item.file ? item.file : 'avatar.png'})` }}>
                                            </div>
                                        </div>
                                        <p className='userName'>{item.fullName}</p>
                                    </div>
                                ))
                                }
                            </div> : <Empty />
                        }
                    </div>
                </div>
            </div>

            <div className="container say-about" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>Meet Our Specialist</h2>
                            <p className='form-text m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsum!</p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 offset-lg-6">
                        <div className="my-2">
                            <h4 style={{ color: '#223a66' }} className='my-0'>Amazing service!</h4>
                            <Link to='/contact'>
                                <span>Contact Us</span>
                            </Link>
                        </div>
                        <p className='form-text'>
                            We provide great service facilty consectetur adipisicing elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam eveniet nostrum nemo commodi numquam quod.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About