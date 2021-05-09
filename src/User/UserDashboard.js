import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {Card,ListGroup,Table} from 'react-bootstrap'
import {isAuthenticated} from '../auth/index'
import {getUser} from '../store/actions/user'
import moment from 'moment'
import styles from './UserDashboard.module.scss'

const UserDashboard = () => {
	const {name,email,role} = isAuthenticated();
	const dispatch = useDispatch()
	const user = useSelector(state => state.user ? state.user : {})

	useEffect(() => {
		dispatch(getUser())
	}, [])

	const UserInformation = () => (
		<div className={`mb-4 p-4 rounded ${styles.leftPanel}`}>
			<div className={`d-flex flex-row justify-content-between align-items-center ${styles.headingUnderline}`}>
				<h5>User Profile</h5>
				<Link to="/profile/update">Edit</Link>
			</div>
			<div className="">
				<p className="text-muted mt-3 mb-2">Name</p>
				<h6>{user.name}</h6>
				<p className="text-muted mt-3 mb-2">Email</p>
				<h6>{user.email}</h6>
				<p className="text-muted mt-3 mb-2">Role</p>
				<h6>{user.role === 0 ? 'Admin' : 'Registered User'}</h6>
			</div>
		</div>
	)
	const UserLinks = () => (	
		<div className={`mb-4 p-4 rounded ${styles.leftPanel}`}>
			<div className="">
				<Link to="/cart">View My Cart</Link>
			</div>
		</div>	
	)
	const BillingInformation = () => (
		<div className={`mb-4 p-4 rounded ${styles.leftPanel}`}>
			<div className={`d-flex flex-row justify-content-between align-items-center ${styles.headingUnderline}`}>
				<h5>Billing Information</h5>
				<Link to="/profile/billing">Edit</Link>
			</div>
			<p className="text-muted mt-3 mb-2">Address: </p>
			<h6>{user.address ? user.address : '-'}</h6>
			<p className="text-muted mt-3 mb-2">Phone Number: </p>
			<h6>{user.phone ? user.phone : '-'}</h6>
			<p className="text-muted mt-3 mb-2">Zip Code: </p>
			<h6>{user.zipcode ? user.zipcode : '-'}</h6>
		</div>
	)
	const PurchaseHistory = () => (
		<div className="mb-4 p-4 shadow-1">
				<div className={`d-flex flex-row justify-content-between align-items-center mb-4 ${styles.headingUnderline}`}>
					<h5>Recent Orders</h5>
				</div>
			<Table hover className={styles.orderHistoryTable}>
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
						user.history && user.history.map(order => (
							<tr>
								<td>
									<Link to={`/user/orders/${order._id}`}>
										{order._id}
									</Link>
								</td>
								<td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
								<td>{order.total}</td>
								<td>{order.status}</td>
							</tr>
						))
					}
				</tbody>
			</Table>
		</div>
	)
	return(
		<div>
			<Layout className="container py-5 my-5">
				<div className="row mt-5">
					<div className='col-12 col-md-4'>
						{UserInformation()}
						{BillingInformation()}
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