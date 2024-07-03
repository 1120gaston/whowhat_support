import React from 'react'
import { serviceBanner } from '../../images'
import { Container } from 'react-bootstrap'

const SubHeader = ({ title, subtitle }) => {
    const sectionStyle = {
        background: `url(${serviceBanner}) no-repeat 50% 50%`,
        backgroundSize: 'cover',
        position: 'relative',
        marginTop: '88px',
        padding: '120px 0px 70px 0px',
    }

    const overlayStyle = {
        content: '""',
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '100%',
        opacity: '0.9',
        background: '#223a66',
    }

    return (
        <section style={sectionStyle} className="about-us">
            <div style={overlayStyle} className="overlay"></div>
            <div className="container position-relative">
                <div className="row">
                    <div className="col-md-12">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase' style={{ color: '#fa1d81' }}>{title}</h2>
                            <p className='m-0' style={{ color: 'rgb(243 239 53)', padding: '0 10%' }}>{subtitle && subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubHeader 
