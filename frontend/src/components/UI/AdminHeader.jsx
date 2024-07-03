import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../images/logo.png'
import './AdminHeader.css'
import { defaultUser } from '../../images'
import { Container } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { Button } from 'antd'

const AdminHeader = () => {
    return (
        <Container className="header spaceBetween">
            <Link to='/'>
                <img style={{ width: '60px' }} src={logo} alt="Logo" />
            </Link>

            <div className='alignCenter'>
                <div className="top-nav-search">
                    <form>
                        <input type="text" className="form-control" placeholder="Search here" />
                        <Button className="searchBtn" type="submit"><FaSearch /></Button>
                    </form>
                </div>

                <div className='profileImage'>
                    <img src={defaultUser} alt="" className="img-fluid" />
                </div>
            </div>

        </Container>
    )
}

export default AdminHeader