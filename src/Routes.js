import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import LogIn from './user/LogIn'
import SignUp from './user/SignUp'

import Home from './core/Home'
import Search from './core/Search'
import Cart from './core/Cart'

import UserDashboard from './user/UserDashboard'
import UserUpdate from './core/User/UserUpdate'



import ProductDetail from './core/Product/ProductDetail'
import OrderDetail from './core/Order/OrderDetail'


// ADMIN ROUTES
import AdminDashboard from './user/AdminDashboard'

import CategoryList from './admin/category/CategoryList'
import CategoryCreate from './admin/category/CategoryCreate'
import CategoryUpdate from './admin/category/CategoryUpdate'

import BrandList from './admin/brand/BrandList'
import BrandCreate from './admin/brand/BrandCreate'
import BrandUpdate from './admin/brand/BrandUpdate'

import ProductList from './admin/product/ProductList'
import ProductCreate from './admin/product/ProductCreate'
import ProductUpdate from './admin/product/ProductUpdate'

import OrderList from './admin/order/OrderList'

const Routes = () => {
	return(
		<div>
			<Router>
				<Switch>
					<Route path="/login" exact component={LogIn}></Route>
					<Route path="/signup" exact component={SignUp}></Route>

					<Route path="/" exact component={Home}></Route>
					<Route path="/search" exact component={Search}></Route>
					<Route path="/cart" exact component={Cart}></Route>
					<Route path="/products/:id" exact component={ProductDetail}></Route>
					
					<PrivateRoute path="/user/dashboard" exact component={UserDashboard}></PrivateRoute>
					<PrivateRoute path="/user/update" component={UserUpdate}></PrivateRoute>
					<PrivateRoute path="/orders/:id" component={OrderDetail}></PrivateRoute>

					{/* Admin Routes */}
					<AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>

					<AdminRoute path="/admin/category" exact component={CategoryList}></AdminRoute>
					<AdminRoute path="/admin/category/new" exact component={CategoryCreate}></AdminRoute>
					<AdminRoute path="/admin/category/:id" component={CategoryUpdate}></AdminRoute>

					<AdminRoute path="/admin/brand" exact component={BrandList}></AdminRoute>
					<AdminRoute path="/admin/brand/new" exact component={BrandCreate}></AdminRoute>
					<AdminRoute path="/admin/brand/:id" component={BrandUpdate}></AdminRoute>

					<AdminRoute path="/admin/product" exact component={ProductList}></AdminRoute>
					<AdminRoute path="/admin/product/new" exact component={ProductCreate}></AdminRoute>
					<AdminRoute path="/admin/product/:id" exact component={ProductUpdate}></AdminRoute>

					<AdminRoute path="/admin/order" exact component={OrderList}></AdminRoute>

				</Switch>
			</Router>
		</div>
	)
}


export default Routes