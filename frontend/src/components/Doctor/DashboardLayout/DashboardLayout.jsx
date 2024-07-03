import React from 'react'
import DashboardSidebar from '../../UI/DashboardSidebar'

const DashboardLayout = ({ children }) => {
	return (
		<>
			<div className="container-fluid" style={{ margin: '120px 0' }}>
				<div className="row">
					<div className="col-md-5 col-lg-4 col-xl-3">
						<DashboardSidebar />
					</div>
					<div className="col-md-7 col-lg-8 col-xl-9">
						{children}
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardLayout