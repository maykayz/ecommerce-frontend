import React, {useEffect,useState} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Button,ButtonGroup,Badge,Table,Alert,Modal} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import moment from 'moment'
import Stepper from 'react-stepper-horizontal';
import { currencyFormatter } from '../../helpers'
import {getOrders,cancelOrder,updateOrderStatus} from '../../store/actions/orders'
import Layout from '../../core/Layout'

const OrderList = ({history}) => {

	const dispatch = useDispatch()
	const orders = useSelector(state => state.orders.orders ? state.orders.orders : [])
	const status = useSelector(state => state.orders.status ? state.orders.status : [])

	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Admin',
		},
		{
			to: '/admin/order',
			title: 'Order',
		},
	]

	const [isModalOpen,setIsModalOpen] = useState(false)
	const [editOrder,setEditOrder] = useState({})

	useEffect(() => {
		dispatch(getOrders())
	},[dispatch])

	const showModalHandler = (item) => (e) => {
		setEditOrder(item)
		setIsModalOpen(true)
	}
	const changeStatusHandler = (item,status) => (e) => {
		item.status = status
		dispatch(updateOrderStatus(item))
		setIsModalOpen(false)
	}
	const cancelHandler = (id) => (e) => {
		dispatch(cancelOrder(id))
		dispatch(getOrders())
	}

	const showSuccessAlert = () => (
		<Alert variant="success" dismissible="true" show={status.isSuccess && status.successMessage ? true: false}>{status.successMessage}
		</Alert>
	)
	const showErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={status.isSuccess === false && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
	)

	const showChangeStatusModal = () => {
		const status = [
			{
				title: 'New'
			},
			{
				title: 'Processing'
			},
			{
				title: 'Shipping'
			},
			{
				title: 'Delivered'
			},
		]
		const getIndex = () => {
			return status.findIndex( s => s.title === editOrder.status)
		}
		const getStatus = () => {
			return status[getIndex()+1].title
		}
		return (
			<Modal size="md" show={isModalOpen} onHide={() => setIsModalOpen(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Change Order Status</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="mb-5s py-4">
						<Stepper 
							size={16}
							titleTop={16}
							titleFontSize={16}
							circleFontSize={0}
							completeColor="black"
							steps={status} 
							activeStep={ getIndex()}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					{
						getIndex() < status.length && editOrder.status !== 'Delivered' &&
						<Button class="btn btn-primary" onClick={changeStatusHandler(editOrder,getStatus())}>Change to {getStatus()}</Button>
					}
				</Modal.Footer>
			</Modal>

		)
	}

	const showOrderList = () => (
		<div className="mb-4 p-4 shadow-1">
			<Table hover className="order-history-table">
				<thead>
					<tr>
						<th>Order</th>
						<th>Placed On</th>
						<th>Total</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						orders.length ? orders.map(order => (
							<tr>
								<td>
									<Link to={`/orders/${order._id}`}>
										{order._id}
									</Link>
								</td>
								<td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
								<td>{currencyFormatter(order.total)} MMK</td>
								<td>
									<Badge 
										variant={order.status === 'Cancel' ? 'danger': order.status === 'Delivered'?'success':'primary'}
										className="rounded px-2 py-2"
									>
										{order.status}
									</Badge>
								</td>
								<td>
									<ButtonGroup className="float-right">
										{
											order.status !== 'Delivered' && order.status !== 'Cancel' &&
											<Button variant="outline-primary" onClick={showModalHandler(order)}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
													<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
													<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
												</svg>
											</Button>
										}
										{
											order.status === 'New' &&
											<Button variant="outline-primary" onClick={cancelHandler(order._id)}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
													<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
												</svg>
											</Button>
										}
									</ButtonGroup>
								</td>
							</tr>
						))
						: 
						<p className="m-3">No record found.</p>
					}
				</tbody>
			</Table>
		</div>
	)

	return (
		<Layout breadcrumbs={breadcrumbs} className="container">
			<div>
				<div className="row">
					<div className="col-12">
						<div className="d-flex flex-row justify-content-between">
							<h1 className="heading my-3 py-0">Orders</h1>
						</div>
					</div>
					<div className="col-12">
						<div className="py-3">
							{/* {showSuccessAlert()}
							{showErrorAlert()} */}
							{status.loading && <div className="text-center">Loading...</div>}
							{orders.length ? showOrderList() : ''}
							{showChangeStatusModal()}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)

}

export default withRouter(OrderList);