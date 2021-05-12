import React, {useEffect,useState} from 'react'
import {Link,withRouter} from 'react-router-dom'
import swal from 'sweetalert';
import {Button,ButtonGroup,Badge,Table,Alert,Modal,FormGroup,FormLabel,FormControl,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import moment from 'moment'
import Stepper from 'react-stepper-horizontal';
import Calender from 'react-modern-calendar-datepicker';
import { currencyFormatter } from '../../helpers'
import {getOrders,cancelOrder,updateOrderStatus} from '../../store/actions/orders'
import Layout from '../../core/Layout'

const OrderList = ({history}) => {

	const dispatch = useDispatch()
	const orders = useSelector(state => state.orders.orders ? state.orders.orders : [])


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
		}
	]

	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Admin',
		},
		{
			to: '/admin/order',
			title: 'Orders',
		},
	]

	const [isModalOpen,setIsModalOpen] = useState(false)
	const [editOrder,setEditOrder] = useState({})
	const [filters,setFilters] = useState({
		status: '',
		start_date: '',
		end_date: '',
		min: null,
		max: null
	})
	const [selectedDayRange, setSelectedDayRange] = useState({
		from: '',
		to: ''
	});

	
	useEffect(() => {
		dispatch(getOrders({}))
	},[dispatch])

	const formatDatePickerText = () => {
		if(selectedDayRange && selectedDayRange.from && selectedDayRange.to){
			return `${selectedDayRange.from.day}/${selectedDayRange.from.month}/${selectedDayRange.from.year} ~ ${selectedDayRange.to.day}/${selectedDayRange.to.month}/${selectedDayRange.to.year}`;
		}
	  };

	const onDatePickerChanged = (value) => {
		setSelectedDayRange(value)
		console.log(value)
		setFilters({
			...filters,
			start_date: `${value.from.month}/${value.from.day}/${value.from.year}`,
			end_date: `${value.to.month}/${value.to.day}/${value.to.year}`
		})

	}
	const onFilterChange = (name) => (e) => {
		setFilters({
			...filters,
			[name]: e.target.value
		})
	}
	const onFilterSubmit = (e) => {
		e.preventDefault()
		console.log(filters)
		dispatch(getOrders(filters))
	}
	const showModalHandler = (item) => (e) => {
		setEditOrder(item)
		setIsModalOpen(true)
	}
	const onChangeStatusHandler = (item,status) => (e) => {
		item.status = status
		dispatch(updateOrderStatus(item))
		setIsModalOpen(false)
	}
	const onEditHandler = (id) => (e) => {

	}
	const onCancelHandler = (id) => (e) => {
		swal({
			text: 'Are you sure you want to cancel order?',
			icon: "warning",
			buttons: {
			cancel: "No",
			confirm: {
				text: "Yes, continue.",
				value: "confirm",
			}
			},
		}).then((result) => {
			if(result === 'confirm'){
				console.log(result)
				dispatch(cancelOrder(id))
				dispatch(getOrders())
				swal('Order Cancelled successfully');
			}
		});
	}

	// const showSuccessAlert = () => (
	// 	<Alert variant="success" dismissible="true" show={status.isSuccess && status.successMessage ? true: false}>{status.successMessage}
	// 	</Alert>
	// )
	// const showErrorAlert = () => (
	// 	<Alert variant="danger" dismissible="true" show={status.isSuccess === false && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
	// )

	const showChangeStatusModal = () => {
		const getIndex = () => {
			return status.findIndex( s => s.title === editOrder.status)
		}
		const getStatus = () => {
			return status[getIndex()+1].title
		}
		return (
			<Modal centered size="md" show={isModalOpen} onHide={() => setIsModalOpen(false)}>
				<Modal.Header closeButton className="border-0 my-0 py-3">
					<h5 className="my-0 py-0">Change Order Status</h5>
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
				<Modal.Footer className="border-0">
					{
						getIndex() < status.length && editOrder.status !== 'Delivered' &&
						<Button className="btn btn-primary" onClick={onChangeStatusHandler(editOrder,getStatus())}>Change to {getStatus()}</Button>
					}
				</Modal.Footer>
			</Modal>

		)
	}
	const showFilters = () => (
		<Form onSubmit={onFilterSubmit}>
			<div className="row align-items-end">
				<FormGroup className="col-12 col-md-3 col-sm-6 mb-2">
					<FormLabel id="name">
						Status
					</FormLabel>
					<Form.Control 
						name="status"
						as="select" 
						className="form-control"
						custom
						value={filters.status} 
						onChange={onFilterChange('status')}
					>
						<option value="">All</option>
						{
							status.map(item => (
								<option value={item.title}>{item.title}</option>
							))
						}
						<option value="Cancel">Cancel</option>
					</Form.Control>
				</FormGroup>
				<FormGroup className="col-12 col-md-3 col-sm-6 mb-2 d-flex flex-column">
					<FormLabel id="name">
						Date Range
					</FormLabel>
					<Calender
						className="form-control"
						value={selectedDayRange}
						onChange={onDatePickerChanged}
						shouldHighlightWeekends
						inputClassName="form-control bg-white"
						formatInputText={formatDatePickerText} 
					/>
				</FormGroup>
				<FormGroup className="col-12 col-md-3 col-sm-6 mb-2">
					<FormLabel id="name">
						Min
					</FormLabel>
					<FormControl name="name" value={filters.min} onChange={onFilterChange('min')}>	
					</FormControl>
				</FormGroup>
				<FormGroup className="col-12 col-md-3 col-sm-6 mb-2">
					<FormLabel id="name">
						Max
					</FormLabel>
					<FormControl name="name" value={filters.max} onChange={onFilterChange('max')}>	
					</FormControl>
				</FormGroup>
				<FormGroup className="col-12 col-md-3 col-sm-6 my-2">
					<Button style={{height:'46px',width:'100%'}} variant="primary" type="submit">Search</Button>
				</FormGroup>
			</div>
		</Form>
	)
	const showOrderList = () => (
		<div className="my-5">
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
								<td>{moment(order.createdAt).format("MM/DD/YYYY")}</td>
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
											order.status && 
											<Button variant="outline-primary" onClick={showModalHandler(order)}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-menu-button-wide-fill" viewBox="0 0 16 16">
													<path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-2A1.5 1.5 0 0 0 14.5 0h-13zm1 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm9.927.427A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0l-.396-.396zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
												</svg>
											</Button>
											
										}
										{
											order.status !== 'Delivered' && order.status !== 'Cancel' &&
											<Button variant="outline-primary" onClick={onEditHandler(order._id)}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
													<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
													<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
												</svg>
											</Button>
										}
										{
											order.status === 'New' &&
											<Button variant="outline-primary" onClick={onCancelHandler(order._id)}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
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
					{/* <div className="col-12">
						<div className="d-flex flex-row justify-content-between">
							<h1 className="heading my-3 py-0">Orders</h1>
						</div>
					</div> */}
					<div className="col-12">
						<div className="py-3">
							{/* {showSuccessAlert()}
							{showErrorAlert()} */}
							{status.loading && <div className="text-center">Loading...</div>}
							{showFilters()}
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