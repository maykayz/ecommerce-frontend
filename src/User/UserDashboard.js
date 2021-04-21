import React from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {Card,ListGroup} from 'react-bootstrap'
import {isAuthenticated} from '../auth/index'

const UserDashboard = () => {
	const {name,email,role} = isAuthenticated();

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
				<h6>{name}</h6>
				<p className="text-muted mt-3 mb-2">Email</p>
				<h6>{email}</h6>
				<p className="text-muted mt-3 mb-2">Role</p>
				<h6>{role === 0 ? 'Admin' : 'Registered User'}</h6>
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
					<p className="text-muted mt-3 mb-2">Address</p>
					<h6>No.5, Block 36A, Shwe Kan Tharyar, Yangon</h6>
					<p className="text-muted mt-3 mb-2">Phone Number</p>
					<h6>09 960 7654 60}</h6>
					<p className="text-muted mt-3 mb-2">Zip Code</p>
					<h6>11401</h6>
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
					<ListGroup.Item className="d-flex flex-row justify-content-between">
						<Link to="/order/123123">Order #123123</Link>
						<label className="text-muted text-dark-50">Status: <span>Delivered</span></label>
					</ListGroup.Item>
					<ListGroup.Item className="d-flex flex-row justify-content-between">
						<Link to="/order/123123">Order #123123</Link>
						<label className="text-muted text-dark-50">Status: <span>Delivered</span></label>
					</ListGroup.Item>
					<ListGroup.Item className="d-flex flex-row justify-content-between">
						<Link to="/order/123123">Order #123123</Link>
						<label className="text-muted text-dark-50">Status: <span>Delivered</span></label>
					</ListGroup.Item>
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