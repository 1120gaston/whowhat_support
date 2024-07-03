import { Badge, Popover } from "antd"
import { Link, NavLink } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { Drawer, Button } from 'antd'
import { navLinkInfo } from "../../../constant"
import auth from "../../auth/authHelper"
import { END_POINT } from "../../../config"
import { defaultUser } from "../../../images"
import { useEffect, useState } from "react"
import { read, userList } from "../../../api/api_user"
import { getBlogs } from "../../../api/api_article"

const HeaderNav = ({ open, setOpen, content }) => {
  const [usernum, setUserNum] = useState(0);
  const [blognum, setBlogNum] = useState(0);
  const [user, setUser] = useState()
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    let user_num = 0
    let blog_num = 0
    jwt && read({ id: jwt.id }, { t: jwt.token }).then((data) => {
      data && setUser(data)
    })
    userList().then((data) => {
      if (data) {
        data.map((item) => (
          item.viewed === false && user_num++
        ))
        setUserNum(user_num)
      }
    })
    getBlogs({ agree: false }).then((data) => {
      data?.map((item) => (
        item.agree === false && blog_num++
      ))
      setBlogNum(blog_num)
    })
  }, [])


  return (
    <>
      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
          {
            user?.email === 'support@whosupportswhat.com' && <li><NavLink to={'/admin/dashboard'} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>
              <Badge count={usernum + blognum} className='p-1'>
                Admin
              </Badge>
            </NavLink></li>
          }
          {navLinkInfo.map((item, index) => (
            <li key={index}><NavLink to={item.link} className={({ isActive }) => isActive ? "nav-link scrollto active" : ""}>{item.title}</NavLink></li>
          ))}
          {!jwt ? <li><Link to={'/login'} className="nav-link scrollto">Login</Link></li> :
            <>
              <Popover content={content}>
                <div className='profileImage'>
                  <img src={`${END_POINT}/uploads/${user?.file ? user.file : 'avatar.png'}`} alt="" className="profileImage shadow img-fluid" />
                </div>
              </Popover>
            </>
          }
        </ul>

        <FaBars className='mobile-nav-toggle' onClick={showDrawer} />
      </nav>
      <Drawer
        placement={'left'}
        width={500}
        onClose={onClose}
        open={open}
        size={"default"}
        extra={<Button type="primary" onClick={onClose}> Close</Button>}
      >
        <ul className="mobile-menu-nav">
          {navLinkInfo.map((item, index) => (
            <li key={index} style={{ fontSize: '18px' }}><NavLink to={item.link} className="nav-link alignCenter">{item.icon}{item.title}</NavLink></li>
          ))}
        </ul>
      </Drawer>
    </>
  )
}

export default HeaderNav