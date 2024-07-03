import React from 'react'
import { Link } from 'react-router-dom'

import { service1, service2, service3 } from '../../../images'
import './index.css'

const Service = () => {
    return (
        <section className="container" style={{ marginTop: 200, marginBottom: 200 }}>
            <div className='mb-5 section-title text-center'>
                <h2>Services</h2>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img">
                            <img src={service1} alt="" className="img-fluid" />
                            <img src={service2} alt="" className="img-fluid mt-4" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img mt-4 mt-lg-0">
                            <img src={service3} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-content ps-4 mt-4 mt-lg-0">
                            <h2>Personal Care <br />Infomation</h2>
                            <p className="mt-4 mb-5 text-secondary form-text">We provide best leading Photo and Image service Nulla perferendis veniam deleniti ipsum officia dolores repellat laudantium obcaecati neque.</p>
                            <Link to={'/service'} className="btn-get-started scrollto">Services</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Service