import React from 'react'
import { Container } from 'react-bootstrap'
import SubHeader from '../Shared/SubHeader'

import Header from '../Shared/Header/Header'
import Footer from '../Shared/Footer/Footer'
import BlogBody from './BlogBody'

const Blog = () => {

    return (
        <>
            <Header />
            <SubHeader title='Blog' subtitle='' />
            <Container>
                <BlogBody />
            </Container>
            <Footer />
        </>
    )
}
export default Blog 