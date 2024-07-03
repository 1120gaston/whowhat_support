import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import SubHeader from '../Shared/SubHeader'

import { serviceInfo } from '../../constant'
import { serviceBlog } from '../../images'

const Service = () => {
  const weArePleaseStyle = {
    backgroundColor: "antiquewhite",
    height: "60vh",
    background: `url(${serviceBlog}) no-repeat`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: "10px",
    position: "relative",
    marginTop: 200,
    marginBottom: 100
  }
  return (
    <>
      <Header />
      <SubHeader title="Our Service" subtitle="" />

      <div className="container" style={{ marginTop: 200, marginBottom: 100 }}>
        <div className="row">
          {
            serviceInfo.map((item, id) => (
              <div className="col-lg-4 col-md-6 col-sm-6" key={id + 6}>
                <div className="card shadow border-0 mb-5">
                  <img src={item.img} alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                  <div className="p-2">
                    <h4 className="mt-4 mb-2">{item.title}</h4>
                    <p className="mb-4">{item.content}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <section style={weArePleaseStyle}>
        <div className="container" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <div className="row">
            <div className="col-lg-7">
              <div className="d-flex align-items-center">
                <div className='mb-4 p-5 section-title text-center'>
                  <h2 className='text-uppercase'>We are pleased to offer you the</h2>
                  <p className='form-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, sed.</p>
                  <Link to={'/blog'} className="btn-get-started scrollto">Show Blog</Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Service