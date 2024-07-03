import React from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from "react-icons/fa"
import logo from '../../../images/logo.png'
import './Footer.css'
import { supportInfo } from '../../../constant'

const Footer = () => {
	return (
		<footer className="footer position-relative">
			<div className="footer-top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<Link to={'/'}>
										<img src={logo} alt="logo" style={{ maxWidth: '160px' }} />
									</Link>
								</div>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">

							<div className="footer-widget footer-menu">
								<h3 className="footer-title">For Support</h3>
								<ul>
									<li><Link to={'/'}><FaAngleDoubleRight className='icon' />  Home</Link></li>
									<li><Link to={'/about'}><FaAngleDoubleRight className='icon' /> About</Link></li>
									<li><Link to={'/contact'}><FaAngleDoubleRight className='icon' />  Contac Us</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-contact">
								<h3 className="footer-title mt-3 mt-md-0">Contact Us</h3>
								<div className="footer-contact-info">
									<div className="footer-address">
										<span><i className="fas fa-map-marker-alt"></i></span>
										<p> {supportInfo.address} </p>
									</div>
									<p>
										<i className="fas fa-phone-alt"></i>
										{supportInfo.phone}
									</p>
									<p className="mb-0">
										<i className="fas fa-envelope"></i>
										{supportInfo.email}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container-fluid">

					<div className="copyright">
						<div className="row">
							<div className="col-md-6 col-lg-6">
								<div className="copyright-text">
									<div className="copyRight text-center text-white">
										Copyright {(new Date()).getFullYear()} All Rights Reserved
									</div>
								</div>
							</div>
							<div className="col-md-6 col-lg-6">
								<div className="copyright-menu">
									<ul className="policy-menu d-flex gap-2 justify-content-center">
										<Link to={'/terms'} className='text-white'>Terms and Conditions</Link>
										<Link to={'/privacy'} className='text-white'>Policy</Link>
									</ul>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</footer>
	)
}

export default Footer