import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import PatientProfileSetting from '../ProfileSetting/PatientProfileSetting'
import Header from '../../Shared/Header/Header'
import Footer from '../../Shared/Footer/Footer'
import BlogBody from '../../Blog/BlogBody'
import { useParams } from 'react-router-dom'
import auth from '../../auth/authHelper'
import { view } from '../../../api/api_user'


const MyProfile = () => {

  const jwt = auth.isAuthenticated();
  const [userData, setUserData] = useState({
    fullName: '',
    mobile: '',
    gender: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    address: '',
    file: '',
    link: '',
    description: ''
  })
  const { userid } = useParams();

  useEffect(() => {
    view({ id: userid }, { t: jwt.token }).then((data) => {
      data && setUserData(data)
    })
  }, [userid])
  return (
    <>
      <Header />
      <Container style={{ marginTop: '150px' }}>
        <PatientProfileSetting userData={userData} setUserData={setUserData} />
        <BlogBody showType='profile' userid={userid} />
      </Container>
      <Footer />
    </>
  )
}

export default MyProfile