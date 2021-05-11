import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'
import moment from 'moment'
import Layout from '../core/Layout'
import {getUser} from '../store/actions/user'
import { currencyFormatter } from '../helpers'

const UserDashboard = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user ? state.user : {})

	const breadcrumbs = [
		{
			to: '/',
			title: 'Home',
		},
		{
			to: '/user/dashboard',
			title: 'Dashboard',
		},
	]

	useEffect(() => {
		dispatch(getUser())
	}, [])

	const UserInformation = () => (
		<div className="mb-4 p-4 rounded bg-light">
			<div className='d-flex flex-row justify-content-between align-items-center heading-underlined'>
				<h5>User Information</h5>
				<Link to="/user/update">Edit</Link>
			</div>
			<div className="">
				<p className="text-muted mt-3 mb-2">Name</p>
				<h6>{user.name}</h6>
				<p className="text-muted mt-3 mb-2">Email</p>
				<h6>{user.email}</h6>
				<p className="text-muted mt-3 mb-2">Role</p>
				<h6>{user.role === 0 ? 'Admin' : 'Registered User'}</h6>
				<hr></hr>
				<p className="text-muted mt-3 mb-2">Address: </p>
				<h6>{ user.contact_info && user.contact_info.address ? user.contact_info.address : '-'}</h6>
				<p className="text-muted mt-3 mb-2">Phone Number: </p>
				<h6>{ user.contact_info && user.contact_info.phone ? user.contact_info.phone : '-'}</h6>
				<p className="text-muted mt-3 mb-2">Zip Code: </p>
				<h6>{ user.contact_info && user.contact_info.zipcode ? user.contact_info.zipcode : '-'}</h6>
			</div>
		</div>
	)
	const UserLinks = () => (	
		<div className="mb-4 p-4 rounded bg-light">
			<div className="">
				<Link to="/cart">View My Cart</Link>
			</div>
		</div>	
	)
	const BillingInformation = () => (
		<div className="mb-4 p-4 rounded bg-light">
			<div className='d-flex flex-row justify-content-between align-items-center heading-underlined'>
				<h5>Billing Information</h5>
			</div>
		</div>
	)
	const PurchaseHistory = () => (
		<div className="mb-4 p-4 shadow-1">
				<div className='d-flex flex-row justify-content-between align-items-center mb-4 heading-underlined'>
					<h5>Recent Orders</h5>
				</div>
			<Table hover className="order-history-table">
				<thead>
					<tr>
					<th>Order</th>
					<th>Placed On</th>
					<th>Total</th>
					<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{
						user.history && user.history.length ? user.history.map(order => (
							<tr>
								<td>
									<Link to={`/orders/${order._id}`}>
										{order._id}
									</Link>
								</td>
								<td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
								<td>{currencyFormatter(order.total)} MMK</td>
								<td>{order.status}</td>
							</tr>
						))
						: 
						<p className="m-3">No record found.</p>
					}
				</tbody>
			</Table>
		</div>
	)
	return(
		<div>
			<Layout breadcrumbs={breadcrumbs} className="container">
				<div className="row mt-5">
					<div className='col-12 col-md-4'>
						{UserInformation()}
						{/* {BillingInformation()} */}
						{UserLinks()}
					</div>
					<div className="col-12 col-md-8">
						{PurchaseHistory()}
					</div>
				</div>
			</Layout>
		</div>
	)
}


export default UserDashboard