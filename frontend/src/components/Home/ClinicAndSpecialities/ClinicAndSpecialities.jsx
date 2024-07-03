import React from 'react'
import { FaCheckDouble } from "react-icons/fa"

import './index.css'
import { specialInfo } from '../../../constant'

const ClinicAndSpecialities = () => {
	return (
		<section className="section section-specialities position-relative">
			<div className="container-fluid">
				<div className='mb-5 section-title text-center'>
					<h2>Best and Specialities</h2>
				</div>

				<div className="row justify-content-center">
					<div className="col-md-9">
						<div className="specialities-slider d-flex justify-content-center align-items-center gap-5 flex-wrap">
							{specialInfo.map((item, index) => (
								<div key={index} className="speicality-item text-center">
									<div className="speicality-img">
										<img src={item.img} className="img-fluid" alt="" />
										<span><i><FaCheckDouble /></i></span>
									</div>
									<p>{item.title}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ClinicAndSpecialities 