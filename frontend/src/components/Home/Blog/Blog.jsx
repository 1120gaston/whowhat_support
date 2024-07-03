import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { Container } from 'react-bootstrap'
import { Badge, Empty, Image } from 'antd'

import { popBlogs } from '../../../api/api_article'
import { END_POINT } from '../../../config'
import auth from '../../auth/authHelper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import './index.css'

const Blog = () => {
    const jwt = auth.isAuthenticated()
    const [blogData, setBlogData] = useState(null)
    useEffect(() => {
        popBlogs().then((data) => {
            data && setBlogData(data)
        })

    }, [])

    return (
        <Container>
            <div className='my-5 pt-5 section-title text-center'>
                <h2>POP BLOGS</h2>
            </div>
            {
                blogData && blogData[0] ? <div className="row g-4">
                    <Image.PreviewGroup>
                        {
                            blogData?.map((item, index) => (
                                <div className="col-lg-3 col-md-4 col-sm-12" key={index + 55}>
                                    <div className="gallery-item">
                                        <div className="galelry-lightbox d-flex justify-content-center align-items-center">
                                            <Link to={jwt.token ? `/blog/${item?._id}` : '/login'}>
                                                <Image src={`${END_POINT}/uploads/${item.file}`} alt="" className="w-100" style={{ objectFit: 'cover', maxHeight: '280px', minHeight: '280px' }} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Image.PreviewGroup>
                </div> : <Empty />
            }
            <div className="my-6 itemCenter p-3" style={{ background: '#f8f9fa', marginBottom: '50px' }}>
                <Link to={'/blog'} className='more-btn m-3'>See More Blogs</Link>
            </div>
        </Container>
    )
}
export default Blog