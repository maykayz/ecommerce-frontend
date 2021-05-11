import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {ListGroup,Table} from 'react-bootstrap'
import {getUser} from '../store/actions/user'
import { currencyFormatter } from '../helpers'

const AdminDashboard = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user ? state.user : {})

	const breadcrumbs = [
		{
			to: '/',
			title: 'Home',
		},
		{
			to: '/admin/dashboard',
			title: 'Dashboard',
		},
	]

	useEffect(() => {
		dispatch(getUser())
	}, [])

	const UserInformation = () => (
		<div className="mb-4 p-4 rounded bg-light">
			<div className='d-flex flex-row justify-content-between align-items-center heading-underlined'>
				<h5>Admin Information</h5>
				<Link to="/admin/update">Edit</Link>
			</div>
			<div className="">
				<p className="text-muted mt-3 mb-2">Name</p>
				<h6>{user.name}</h6>
				<p className="text-muted mt-3 mb-2">Email</p>
				<h6>{user.email}</h6>
				<p className="text-muted mt-3 mb-2">Role</p>
				<h6>{user.role === 0 ? 'Admin' : 'Registered User'}</h6>
				<hr></hr>
				<p className="text-muted mt-3 mb-2">Account Created On: </p>
				<h6>{ user.createdAt ? moment(user.createdAt).format('DD/MM/YYYY HH:mm') : '-'}</h6>
			</div>
		</div>
	)
	const AdminLinks = () => (
		<ListGroup className="bg-light rounded">
			<ListGroup.Item className="border border-light bg-transparent">
				<Link to="/admin/category">Category List</Link>
			</ListGroup.Item>
			<ListGroup.Item className="border border-light bg-transparent">
				<Link to="/admin/brand">Brand List</Link>
			</ListGroup.Item>
			<ListGroup.Item className="border border-light bg-transparent">
				<Link to="/admin/product">Product List</Link>
			</ListGroup.Item>
			<ListGroup.Item className="border border-light bg-transparent">
				<Link to="/admin/order">Order List</Link>
			</ListGroup.Item>
		</ListGroup>
	)
	const StatisticsCharts = () => (
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
					<div className="col-12 col-md-4">
						{UserInformation()}
						{AdminLinks()}
					</div>
					<div className="col-12 col-md-8">
						{StatisticsCharts()}
					</div>
				</div>
			</Layout>
		</div>
	)
}


export default AdminDashboard