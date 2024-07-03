import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from 'antd'

import { heroBg } from '../../../images'
import './index.css'
import auth from '../../auth/authHelper'

const HeroSection = () => {
    return (
        <section id="hero" className="d-flex align-items-center" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="container">
                <small>Bringing Transparency to Online Interactions</small>
                <h1>Who Supports What</h1>
                <p>Register now to upload the content you disagreed with.</p>
                {!auth.isAuthenticated() && <>
                    <Link to='/login'><Button type='primary'>Register Now</Button></Link>
                    <Link to='/login' className='m-3'><Button type='primary'>Login</Button></Link></>}
            </div>
        </section>
    )
}
export default HeroSection 