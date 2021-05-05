import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion,AnimatePresence } from "framer-motion"
import { Button,Form,FormGroup } from 'react-bootstrap'
import { useForm } from "react-hook-form";

import { currencyFormatter } from '../helpers'

import {getCart,updateQty,removeFromCart} from '../store/actions/cart'
import Layout from './Layout'
import Checkout from './checkout'
import deleteIcon from '../assets/images/delete.svg'

const Cart = () => {

	const dispatch 						= useDispatch()
	const cart_items 					= useSelector(state => state.cart ? state.cart : [])
	const { register, handleSubmit } 	= useForm();
	const [clientToken,setClientToken] = useState('asdfasdfa asdfasdfasd asfsdfasdfas')
	
	useEffect(() => {
		dispatch(getCart())
	},[])

	const onCartUpdateHandler = (item) => (e) => {
		item.count = parseInt(e.target.value)
		dispatch(updateQty(item))
	}

	const onCartItemRemoveHandler = (item) => (e) => {
		dispatch(removeFromCart(item))
	}

	const cartTotalAmount = () => {
		let total = 0
		cart_items.forEach(item => total += (item.price * item.count))
		return currencyFormatter(total)
	}

	const showCartItems = () => (
		cart_items.map((item,index) => (
			<AnimatePresence key={index}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{easings:'easeOut'}}
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
									style={{width:'60px'}}
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
						{currencyFormatter(item.price * item.count)} MMK
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
						<div class="d-flex flex-row justify-content-end mt-4 mb-2">
							<div className="col-2">
								<h6 className="font-bold">Subtotal:</h6>
							</div>
							<div className="col-4">
								<h6 className="text-right">{cartTotalAmount()} MMK</h6>
							</div>
						</div>
						<div class="d-flex flex-row justify-content-end mb-2">
							<div className="col-2">
								<h6 className="font-bold">Shipping:</h6>
							</div>
							<div className="col-4">
								<h6 className="text-right">0 MMK</h6>
							</div>
						</div>
						<hr></hr>
						<div class="d-flex flex-row justify-content-end mb-4 align-items-center">
							<div className="col-6">
								<Link to="/" variant="outline-primary" className="btn btn-outline-primary big-btn mr-2">Continue Shopping...</Link>
							</div>
							<div className="col-2">
								<h6 className="font-bold">Total:</h6>
							</div>
							<div className="col-4">
								<h6 className="text-right">{cartTotalAmount()} MMK</h6>
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
			<Checkout></Checkout>
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
