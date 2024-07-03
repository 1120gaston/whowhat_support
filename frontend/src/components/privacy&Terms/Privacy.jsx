import React from 'react'
import { Container } from 'react-bootstrap'

import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import SubHeader from '../Shared/SubHeader'
import { privacyInfo } from '../../constant'


const Privacy = () => (
  <>
    <Header />
    <SubHeader title="Privacy Policy" subtitle={`"Who Supports What" (hereinafter referred to as "the Platform") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.`} />
    <Container style={{ marginTop: '150px', marginBottom: '100px' }}>
      {privacyInfo.map((item, index) => (
        <div key={index} className='m-4'>
          <h2>{item.title}</h2>
          <div style={{ padding: '0 20px' }}>
            <h6>{item.subTitle}</h6>
            <ul>
              {item.text.map((text, index) => {
                text = text.split(':')
                return (
                  <li key={index}>
                    {text[1] ?
                      <small><b style={{ color: '#09dca4' }}>{text[0]}</b>: {text[1]}</small> :
                      <small>{text[0]}</small>
                    }
                  </li>
                )
              })}
            </ul>
          </div>
          <hr />
        </div>
      ))}
    </Container>
    <Footer />
  </>
)

export default Privacy