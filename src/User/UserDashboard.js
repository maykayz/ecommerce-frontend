import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {Card,ListGroup} from 'react-bootstrap'
import {isAuthenticated} from '../auth/index'
import {getUser} from '../store/actions/user'

const UserDashboard = () => {
	const {name,email,role} = isAuthenticated();
	const dispatch = useDispatch()
	const user = useSelector(state => state.user ? state.user : {})

	useEffect(() => {
		dispatch(getUser())
	}, [])

	const UserInformation = () => (
		<Card className="mb-4">
		<Card.Header>
			<div className="d-flex flex-row justify-content-between align-items-center">
				<h5>User Profile</h5>
				<Link to="/profile/update">Edit</Link>
			</div>
		</Card.Header>
		<Card.Body>
			<div className="">
				<p className="text-muted mt-3 mb-2">Name</p>
				<h6>{user.name}</h6>
				<p className="text-muted mt-3 mb-2">Email</p>
				<h6>{user.email}</h6>
				<p className="text-muted mt-3 mb-2">Role</p>
				<h6>{user.role === 0 ? 'Admin' : 'Registered User'}</h6>
			</div>
		</Card.Body>
	</Card>
	)
	const UserLinks = () => (
		<ListGroup>
			<ListGroup.Item>
				<Link to="/cart">View My Cart</Link>
			</ListGroup.Item>
		</ListGroup>
	)
	const BillingInformation = () => (
		<Card className="mb-4">
			<Card.Header>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<h5>Billing Information</h5>
					<Link to="/profile/billing">Edit</Link>
				</div>
			</Card.Header>
			<Card.Body>
				<div className="">
					<p className="text-muted mt-3 mb-2">Address: </p>
					<h6>{user.address}</h6>
					<p className="text-muted mt-3 mb-2">Phone Number: </p>
					<h6>{user.phone}</h6>
					<p className="text-muted mt-3 mb-2">Zip Code: </p>
					<h6>{user.zipcode}</h6>
				</div>
			</Card.Body>
		</Card>
	)
	const PurchaseHistory = () => (
		<Card className="mb-4">
			<Card.Header>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<h5>Purchase History</h5>
				</div>
			</Card.Header>
			<Card.Body>
				<ListGroup>
					{
						user.history && user.history.map(order => (
							<ListGroup.Item className="d-flex flex-row justify-content-between">
								<Link to="/order/123123">Order #{order._id}</Link>
								<label className="text-muted text-dark-50">Status: <span>{order.status}</span></label>
							</ListGroup.Item>
						))
					}
				</ListGroup>
			</Card.Body>
		</Card>
	)
	return(
		<div>
			<Layout className="container py-5 my-5">
				<div className="row mt-5">
					<div className="col-12 col-md-4">
						{UserInformation()}
						{UserLinks()}
					</div>
					<div className="col-12 col-md-8">
						{BillingInformation()}
						{PurchaseHistory()}
					</div>
				</div>
			</Layout>
		</div>
	)
}


export default UserDashboard