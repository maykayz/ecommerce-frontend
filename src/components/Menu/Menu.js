import React, {useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import{Link,withRouter} from 'react-router-dom'
import {Navbar,Nav, NavDropdown} from 'react-bootstrap'
import { motion, AnimatePresence } from "framer-motion"

import {getCart} from '../../store/actions/cart'

import SearchBar from '../SearchBar/SearchBar'
import Logo from '../logo'
import cart from '../../assets/images/cart.svg'
import userIcon from '../../assets/images/user.svg'
import logoutIcon from '../../assets/images/logout.svg'

import './Menu.scss'

import {logout,isAuthenticated} from '../../auth/index'

const Menu = ({history}) => {

	const dispatch 			= useDispatch()
	const {name} 			= isAuthenticated()
	const [showCart,setShowCart] = useState(false)

	const cart_items = useSelector(state => state.cart ? state.cart : [])

	useEffect(() => {
		dispatch(getCart())
	},[])

	const isActive = (path) => (
		history.location.pathname === path ? true : false
	)
	const getTotalCartItem = () => {
		let total = cart_items.length
		// if(cart_items.length > 0){
		// 	cart_items.forEach(item => {
		// 		total+= parseInt(item.count)
		// 	})
		// }
		return total
	}
	const onClickLogout = () => {
		logout(() => {
			history.push('/login')
		})
	}
	const onClickCart =(e) => {
		e.preventDefault()
		setShowCart(!showCart)
	}

	const showUserName = () => (
		isAuthenticated() ? 
		<NavDropdown.Item className="py-2 nav-link" href={isAuthenticated().role === 0 ? "/admin/dashboard" : "/user/dashboard"}>
			<img style={{width:'15px'}} src={userIcon} alt="User Icon"></img><span className="pl-1">{name}</span>
		</NavDropdown.Item> 
		: ''
	)
	const showSignInButton = () => (
		isAuthenticated() ? 
		<NavDropdown.Item className="py-2 nav-link text-dark" onClick={onClickLogout}>
			<img style={{width:'15px'}} src={logoutIcon} alt="User Icon"></img><span className="pl-1">Log Out</span>
		</NavDropdown.Item>
			: 
			<NavDropdown.Item href="/login">
				<img style={{width:'15px'}} src={userIcon} alt="User Icon"></img><span className="pl-1">Log In</span>
			</NavDropdown.Item>
	)
	const ProfileMenuTitle = () => (
		<img style={{width:'20px'}} src={userIcon} alt="User Icon"></img>
	)
	const cartMenu = () => (
		<motion.div
			initial={{ opacity: 0, display:'none' }}
			animate={showCart ? { opacity: 1, display:'block' } : {opacity: 0, display:'none'}}
			exit={{ opacity: 0, display:'none' }}
			transition={{easings:'easeInOut', duration: 0.2}}
			className="cart-menu"
		>
			{
				cart_items.length ?
				<ul className="list-style-none p-3 m-0">
					{
						cart_items.map((item,index) => (
							<li key={index}>
								<Link
									to={`/products/${item._id}`}
								>
									<div className="d-flex flex-row align-items-center justify-content-between">
										<div className="d-flex flex-row align-items-center">
											<img src={item.url} alt={item.name}></img>
											<h6 className="px-3 my-0">{item.name}</h6>
										</div>
										<h6 className="qty my-0">{item.count}</h6>
									</div>
								</Link>
							</li>
						))
					}
				</ul>: ''
			}
			<div className="text-center py-3">
				{
					cart_items.length ?
					<Link to="/cart" className="my-0 py-2 cursor-pointer">View My Cart</Link> : 
					<Link to="/" className="my-0 py-2 cursor-pointer">No item in cart.</Link>
				}
			</div>
		</motion.div>
	)
	
	return (
		<div>
			<Navbar bg="white" fixed="top" expand="lg" className="d-flex flex-row justify-content-between py-4">
				<Navbar.Brand to="/">
					<Logo></Logo>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{/* <Nav className="mx-auto">
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/') ? 'active': ''}`} to="/">Home</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/new') ? 'active': ''}`} to="/products/new">New</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/men') ? 'active': ''}`} to="/products/men">Men</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/women') ? 'active': ''}`} to="/products/women">Women</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/kids') ? 'active': ''}`} to="/products/kids">Kids</Link>
					</Nav> */}
				</Navbar.Collapse>
				<Nav className="ml-auto">
					<Nav.Item className="nav-link"><SearchBar></SearchBar></Nav.Item>
					<Nav.Item className="nav-link" onClick={onClickCart}>
						<img style={{width:'20px'}} src={cart} alt="Cart Icon"></img>
						{
							cart_items.length > 0 &&
							<div className="cart-has-product">
								{getTotalCartItem()}
							</div>
						}
						{cartMenu()}
					</Nav.Item>
					<NavDropdown
						title={ProfileMenuTitle()}
						active
						alignRight={true}
					>
						{showUserName()}
						{showSignInButton()}
					</NavDropdown>
				</Nav>
			</Navbar>
		</div>
	)
}

export default withRouter(Menu)