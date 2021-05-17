import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useParams,Link} from 'react-router-dom'
import Stepper from 'react-stepper-horizontal';
import moment from 'moment'
import {getOrder} from '../../store/actions/orders'
import { currencyFormatter } from '../../helpers'
import {API_URL} from '../../config'
import Layout from '../../core/Layout'


const OrderDetail = () => {

	const {id}  = useParams()
	const dispatch = useDispatch()
	const order = useSelector(state => state.orders.order ? state.orders.order : {})
	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Dashboard',
		},
		{
			to: '/admin/order',
			title: 'Orders',
		},
		{
			to: `/admin/orders/${id}`,
			title: 'Order Details',
		},
	]
	useEffect(() => {
		dispatch(getOrder(id))
	},[id,dispatch])


	const showProducts = () => (
		<div className="">  
			{
				order.items.map((item,index) => (
					<div
						className="cart-item d-flex flex-row align-items-center justify-content-between py-2" 
						
					>
						<div className="col-5">
							<div className="d-flex flex-row align-items-center">
								<img src={`${API_URL}/products/${item._id}/photo`} alt={item.name}></img>
								<Link
									to={`/products/${item._id}`}
								>
									<h6 className="ml-3">{item.name}</h6>
								</Link>
							</div>
						</div>
						<div className="col-2">
							{item.count}
						</div>
						<div className="col-3">
							{currencyFormatter((item.discount_price ? item.discount_price : item.price) * item.count)} MMK
						</div>
					</div>
			))
			}
		</div>
	)
	const showAmount = () => {
		return(
			<div className="mt-4">
				<div className="d-flex flex-row justify-content-end mt-4 mb-2">
					<div className="col-2">
						<h6 className="font-bold">Subtotal:</h6>
					</div>
					<div className="col-4">
						<h6 className="text-right">{currencyFormatter(order.subtotal)} MMK</h6>
					</div>
				</div>
				<div className="d-flex flex-row justify-content-end mb-2">
					<div className="col-2">
						<h6 className="font-bold">Shipping:</h6>
					</div>
					<div className="col-4">
						<h6 className="text-right">{order.shipping_charges ? order.shipping_charges : 0} MMK</h6>
					</div>
				</div>
				<div className="d-flex flex-row justify-content-end mb-2">
					<div className="col-2">
						<h6 className="font-bold">Discount:</h6>
					</div>
					<div className="col-4">
						<h6 className="text-right">{order.discount} MMK</h6>
					</div>
				</div>
				<hr></hr>
				<div className="d-flex flex-row justify-content-end mb-4 align-items-center">
					<div className="col-2">
						<h6 className="font-bold">Total:</h6>
					</div>
					<div className="col-4">
						<h6 className="text-right">{currencyFormatter(order.total)} MMK</h6>
					</div>
				</div>
			</div>
		)
	}

	const showOrderStatus = () => {
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
			return status.findIndex( s => s.title === order.status)
		}
		return (
			<div className="mb-5 order-card py-4">
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
		)
	}
	const showOrderDetail = () => (
		<div className="py-0 my-0 px-4 mb-4">
			<p 
				className="mb-2"
				style={{
						fontSize: '15px',
						color: 'grey'
				}}
			>
				Order Number: {order._id}
			</p>
			<p
				className="mb-2"
				style={{
						fontSize: '15px',
						color: 'grey'
				}}
			>Placed On: {moment(order.createdAt).format('DD/MM/YYYY HH:mm')}</p>
			{
				order.status === 'Cancel' &&
				<p
				className="mb-2"
				style={{
						fontSize: '15px',
						color: 'red'
				}}
				>Order Status: {order.status}</p>
			}
			
			
		</div>
	)

	const showShippingInfo = () => (
		<div className="order-card p-4 mb-3">
			<h5 className="pb-3">Shipping Address</h5>
				{/* {JSON.stringify(order)} */}
				<p className="text-muted mt-3 mb-2">Address: </p>
				<h6>{ order.shipping && order.shipping.address ? order.shipping.address : '-'}</h6>
				<p className="text-muted mt-3 mb-2">Phone Number: </p>
				<h6>{ order.shipping && order.shipping.phone ? order.shipping.phone : '-'}</h6>
				<p className="text-muted mt-3 mb-2">Zip Code: </p>
				<h6>{ order.shipping && order.shipping.zipcode ? order.shipping.zipcode : '-'}</h6>
		</div>
	)
	const showPaymentInfo = () => (
		<div className="order-card p-4 mb-3">
			{/* <h5 className="pb-3">Payment Details</h5> */}
			<p className="text-muted mt-3 mb-2">Payment Method: </p>
			<h6>{ order.payment_type === 'COD' ? 'Cash On Delivery' : order.payment_type}</h6>
			{/* <p className="text-muted mt-3 mb-2">Remaining Amount: </p>
			<h6>{ order.payment_type === 'COD' ? 'Cash On Delivery' : order.payment_type}</h6> */}
			{/* {JSON.stringify(order)} */}
		</div>
	)

	return (
		<Layout breadcrumbs={breadcrumbs} className="container">
			<div className="row my-5">
				<div className="col-12 col-md-8">
						{
							showOrderDetail()
						}
						{
							order.status !== 'Cancel' &&
							showOrderStatus()
						}
						{
							order && order.items &&
							showProducts()
						}
						{
							showAmount()
						}
				</div>
				<div className="col-12 col-md-4">
					{showPaymentInfo()}
					{showShippingInfo()}
				</div>
			</div>
		</Layout>
	)
}

export default OrderDetail