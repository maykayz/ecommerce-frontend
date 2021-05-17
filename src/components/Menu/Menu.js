import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {motion} from "framer-motion"

import {getCart, clearCart} from '../../store/actions/cart'

import SearchBar from '../SearchBar/SearchBar'
import Logo from '../logo'
import cart from '../../assets/images/cart.svg'
import userIcon from '../../assets/images/user.svg'

import './Menu.scss'

import {logout, isAuthenticated} from '../../auth/index'

const Menu = ({history}) => {

	const dispatch = useDispatch()
	const {name} = isAuthenticated()
	const [showCart, setShowCart] = useState(false)

	const cart_items = useSelector(state => state.cart ? state.cart : [])

	useEffect(() => {
		dispatch(getCart())
	}, [dispatch])

	// const isActive = (path) => (
	// 	history.location.pathname === path ? true : false
	// )
	const getTotalCartItem = () => {
		let total = cart_items.length
		return total
	}
	const onClickLogout = () => {
		logout(() => {
			history.push('/login')
			dispatch(clearCart())
		})
	}
	const onClickCart = (e) => {
		e.preventDefault()
		setShowCart(!showCart)
	}

	const showUserName = () => (
		isAuthenticated() ?
			<NavDropdown.Item className="py-2 px-3 nav-link" href={isAuthenticated().role === 0 ? "/admin/dashboard" : "/user/dashboard"}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
					<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
				</svg>
				<span className="pl-2">{name}</span>
			</NavDropdown.Item>
			: ''
	)
	const showSignInButton = () => (
		isAuthenticated() ?
			<NavDropdown.Item className="py-2 px-3 nav-link text-dark" onClick={onClickLogout}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
					<path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
				</svg>
				<span className="pl-2">Log Out</span>
			</NavDropdown.Item>
			:
			<NavDropdown.Item href="/login">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
					<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
				</svg>
				<span className="pl-2">Log In</span>
			</NavDropdown.Item>
	)
	const ProfileMenuTitle = () => (
		<img style={{width: '20px'}} src={userIcon} alt="User Icon"></img>
	)
	const cartMenu = () => (
		<motion.div
			initial={{opacity: 0, display: 'none'}}
			animate={showCart ? {opacity: 1, display: 'block'} : {opacity: 0, display: 'none'}}
			exit={{opacity: 0, display: 'none'}}
			transition={{easings: 'easeInOut', duration: 0.2}}
			className="cart-menu"
		>
			{
				cart_items.length ?
					<ul className="list-style-none p-3 m-0">
						{
							cart_items.map((item, index) => (
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
					</ul> : ''
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
				<Navbar.Brand href="/">
					<Logo></Logo>
				</Navbar.Brand>
				{/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
				{/* <Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/') ? 'active': ''}`} to="/">Home</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/new') ? 'active': ''}`} to="/products/new">New</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/men') ? 'active': ''}`} to="/products/men">Men</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/women') ? 'active': ''}`} to="/products/women">Women</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/kids') ? 'active': ''}`} to="/products/kids">Kids</Link>
					</Nav>
				</Navbar.Collapse> */}
				<Nav className="ml-auto d-flex flex-row">
					<Nav.Item className="nav-link mx-2"><SearchBar></SearchBar></Nav.Item>
					<Nav.Item className="nav-link mx-2" onClick={onClickCart}>
						<img style={{width: '20px'}} src={cart} alt="Cart Icon"></img>
						{
							cart_items.length > 0 &&
							<div className="cart-has-product">
								{getTotalCartItem()}
							</div>
						}
						{cartMenu()}
					</Nav.Item>
					<NavDropdown
						className="mx-2"
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