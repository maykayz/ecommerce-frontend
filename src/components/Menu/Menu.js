import React from 'react'
import{Link,withRouter} from 'react-router-dom'
import {Navbar,Nav, NavDropdown} from 'react-bootstrap'

import SearchBar from '../SearchBar/SearchBar'
import Logo from '../logo'
import cart from '../../assets/images/cart.svg'
import userIcon from '../../assets/images/user.svg'
import logoutIcon from '../../assets/images/logout.svg'

import './Menu.scss'

import {logout,isAuthenticated} from '../../auth/index'

const Menu = ({history}) => {

	const {name} = isAuthenticated()

	const isActive = (path) => (
		history.location.pathname === path ? true : false
	)
	const onClickLogout = () => {
		logout(() => {
			history.push('/login')
		})
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
	
	return (
		<div>
			<Navbar bg="white" fixed="top" expand="lg" className="d-flex flex-row justify-content-between py-4">
			
				<Navbar.Brand to="/">
					<Logo></Logo>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/') ? 'active': ''}`} to="/">Home</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/new') ? 'active': ''}`} to="/products/new">New</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/men') ? 'active': ''}`} to="/products/men">Men</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/women') ? 'active': ''}`} to="/products/women">Women</Link>
						<Link className={`nav-link font-prata text-dark mx-3 ${isActive('/products/kids') ? 'active': ''}`} to="/products/kids">Kids</Link>
					</Nav>
				</Navbar.Collapse>
				<Nav className="ml-auto">
					<Nav.Item className="nav-link"><SearchBar></SearchBar></Nav.Item>
					<Link className="nav-link" to="/cart"><img style={{width:'20px'}} src={cart} alt="Cart Icon"></img></Link>
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