import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'

import useAuthCheck from '../../../redux/hooks/useAuthCheck'
import TopHeader from '../TopHeader/TopHeader'
import HeaderNav from './HeaderNav'
import { loggedOut } from '../../../service/auth.service'
import { signOut } from '../../../api/api_user'
import auth from '../../auth/authHelper'

import { defaultUser } from '../../../images'
import img from '../../../images/logo.png'
import './index.css'

const Header = () => {
  const navigate = useNavigate()
  const { authChecked, data } = useAuthCheck()
  const [isLoggedIn, setIsLogged] = useState(false)
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)

  // const lastScrollRef = useRef(0)
  const handleScroll = () => {
    const currentScroll = window.scrollY
    // if (currentScroll > lastScrollRef.current) { // Undo scroll up effect
    if (currentScroll > 50) {
      setShow(false)
    } else {
      setShow(true)
    }
    // lastScrollRef.current = currentScroll
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return (() => window.removeEventListener('scroll', handleScroll))
  }, [])

  useEffect(() => { authChecked && setIsLogged(true) }, [authChecked])

  const hanldeSignOut = () => {
    loggedOut()
    signOut().then((data) => {
      sessionStorage.removeItem('jwt')
      message.success("Successfully Logged Out")
      navigate('/')
    })
    setIsLogged(false)
  }

  const jwt = auth.isAuthenticated();
  const content = (
    <div className='nav-popover'>
      <NavLink to={`/profile/${jwt.id}`}><FaUserAlt /> Manage Your Account</NavLink> <br />
      <NavLink onClick={hanldeSignOut}><FaSignOutAlt /> Log Out</NavLink>
    </div >
  )
  return (
    <>
      <div className={`navbar navbar-expand-lg navbar-light ${!show && "hideTopHeader"}`} expand="lg">
        <TopHeader />
      </div>
      <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
        <div className="container d-flex align-items-center">
          <Link to={'/'} className="logo me-auto itemCenter">
            <img src={img} alt="" className="img-fluid" />
          </Link>
          <HeaderNav isLoggedIn={isLoggedIn} data={data} avatar={defaultUser} content={content} open={open} setOpen={setOpen} />
          {jwt && <Link to={'/blogs/create'} className="appointment-btn scrollto"><span className="d-none d-md-inline">Share </span> Your Project</Link>}
        </div>
      </header>
    </>
  )
}

export default Header