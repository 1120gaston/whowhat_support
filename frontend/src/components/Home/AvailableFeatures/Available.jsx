import React from 'react'
import img from '../../../images/features/feature.png'
import AvailableServiceContent from './AvailableServiceContent'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import './index.css'

const Availabe = () => {

	return (
		<section className="container section-features">
			<div className="container-fluid">
				<div className='mb-4 section-title text-center'>
					<h2 className='text-uppercase'>Availabe Service</h2>
				</div>
				<AvailableServiceContent />
			</div>
		</section>
	)
}

export default Availabe 