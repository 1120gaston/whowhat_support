import React from 'react'
import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import { Container } from 'react-bootstrap'
import SubHeader from '../Shared/SubHeader'
import { termsInfo } from '../../constant'


const Terms = () => (
  <>
    <Header />
    <SubHeader title="Terms and Conditions" />
    <Container style={{ marginTop: '150px', marginBottom: '100px' }}>
      {termsInfo.map((item, index) => (
        <div key={index} className='m-4'>
          <h2>{item.title}</h2>
          <div style={{ padding: '0 20px' }}>
            <h6>{item.subTitle}</h6>
            <ul>
              {item.text.map((text, index) => (
                <li key={index}><small >{text}</small></li>
              ))}
            </ul>
          </div>
          <hr />
        </div>
      ))}
    </Container>
    <Footer />
  </>
)

export default Terms