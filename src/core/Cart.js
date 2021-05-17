import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {motion, AnimatePresence} from "framer-motion"
import {Button, Form, FormGroup} from 'react-bootstrap'
import {useForm} from "react-hook-form";
import swal from 'sweetalert'

import {getCart, updateQty, removeFromCart, clearCart} from '../store/actions/cart'
import {addOrder} from '../store/actions/orders'
import {currencyFormatter} from '../helpers'
import Layout from './Layout'
import Checkout from './Checkout'
import deleteIcon from '../assets/images/delete.svg'

const Cart = ({history}) => {

	const dispatch = useDispatch()
	const cart_items = useSelector(state => state.cart ? state.cart : [])
	const {isError} = useSelector(state => state.orders ? state.orders : [])
	const {register} = useForm();
	const shipping_charges = 0
	const discount = 0

	useEffect(() => {
		dispatch(getCart())
	}, [dispatch])

	const onCartUpdateHandler = (item) => (e) => {
		item.count = parseInt(e.target.value)
		dispatch(updateQty(item))
	}

	const onCartItemRemoveHandler = (item) => (e) => {
		dispatch(removeFromCart(item))
	}

	const getSubtotal = () => {
		let subtotal = 0
		cart_items.forEach(item => subtotal += (item.discount_price ? item.discount_price : item.price * item.count))
		return subtotal
	}
	const getTotal = () => {
		let total = getSubtotal() + shipping_charges - discount
		return total
	}

	const onCheckoutHandler = (order) => {
		// ADD_ORDER
		order.subtotal = getSubtotal()
		order.total = getTotal()
		order.shipping_charges = shipping_charges
		order.discount = discount
		const finish = new Promise(resolve => {
			dispatch(addOrder(order))
			resolve()
		})
		if (finish) {
			if (!isError) {
				swal({
					text: `Order Created Successfully`,
					icon: "success",
					button: {
						text: "Continue Shopping"
					}
				}).then((result) => {
					dispatch(clearCart())
					history.push('/')
				})
			} else {
				swal({
					text: `Error Creating Order`,
					icon: "error",
					button: {
						text: "Back"
					}
				})
			}
		}
	}

	const showCartItems = () => (
		cart_items.map((item, index) => (
			<AnimatePresence key={index}>
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					transition={{easings: 'easeOut'}}
					className="cart-item d-flex flex-row align-items-center justify-content-between py-2"

				>
					<div className="col-5">
						<div className="d-flex flex-row align-items-center">
							<img src={item.url} alt={item.name}></img>
							<Link
								to={`/products/${item._id}`}
							>
								<h6 className="ml-3">{item.name}</h6>
							</Link>
						</div>
					</div>
					<div className="col-2">
						<Form key={index}>
							<FormGroup className="d-flex flex-row my-0 align-items-center">
								<input
									className="form-control my-0"
									style={{width: '60px'}}
									type="number"
									defaultValue={item.count ? item.count : 0}
									{...register(`count${index}`)}
									onBlur={onCartUpdateHandler(item)}
								>
								</input>
							</FormGroup>
						</Form>
					</div>
					<div className="col-3">
						{currencyFormatter((item.discount_price ? item.discount_price : item.price) * item.count)} MMK
					</div>
					<div className="col-1">
						<Button variant="outline-primary" onClick={onCartItemRemoveHandler(item)}>
							<img className="icon" src={deleteIcon} alt="Delete Icon"></img>
						</Button>
					</div>
				</motion.div>
			</AnimatePresence>
		))
	)

	const showCartInfo = () => (
		<div className="p-4">
			<h2 className="heading pb-5">Shopping Cart</h2>
			<div className="pb-4">
				{
					cart_items.length ?
						<div>
							{showCartItems()}
							<div className="d-flex flex-row justify-content-end mt-4 mb-2">
								<div className="col-2">
									<h6 className="font-bold">Subtotal:</h6>
								</div>
								<div className="col-4">
									<h6 className="text-right">{currencyFormatter(getSubtotal())} MMK</h6>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-end mb-2">
								<div className="col-2">
									<h6 className="font-bold">Shipping:</h6>
								</div>
								<div className="col-4">
									<h6 className="text-right">{shipping_charges} MMK</h6>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-end mb-2">
								<div className="col-2">
									<h6 className="font-bold">Discount:</h6>
								</div>
								<div className="col-4">
									<h6 className="text-right">{discount} MMK</h6>
								</div>
							</div>
							<hr></hr>
							<div className="d-flex flex-row justify-content-end mb-4 align-items-center">
								<div className="col-6">
									<Link to="/" variant="outline-primary" className="btn btn-outline-primary big-btn mr-2 d-none d-md-block">Continue Shopping...</Link>
								</div>
								<div className="col-2">
									<h6 className="font-bold">Total:</h6>
								</div>
								<div className="col-4">
									<h6 className="text-right">{currencyFormatter(getTotal())} MMK</h6>
								</div>
							</div>
							<div className="row">
								<div className="col-12 d-block d-md-none">
									<Link to="/" variant="outline-primary" className="w-100 btn btn-outline-primary big-btn">Continue Shopping...</Link>
								</div>
							</div>
						</div> :
						<div>
							<Link to="/" variant="outline-primary" className="btn btn-outline-primary big-btn mr-2">Continue Shopping...</Link>
						</div>
				}
			</div>
		</div>
	)

	const showPaymentInfo = () => (
		<div className="payment-card p-4">
			<h2 className="heading pb-5">Payment Info</h2>
			<Checkout onCheckoutClick={onCheckoutHandler}></Checkout>
			<div>
			</div>
		</div>
	)
	return (
		<Layout className="container py-5 my-5">
			<div className="row my-5">
				<div className="col-12 col-lg-8">
					{showCartInfo()}
				</div>
				<div className="col-12 col-lg-4">
					{showPaymentInfo()}
				</div>
			</div>
		</Layout>
	)
}

export default Cart
