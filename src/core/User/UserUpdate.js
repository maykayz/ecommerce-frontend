
import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Form,Button,Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'

import Layout from '../Layout'
import {getUser,updateUser} from '../../store/actions/user'

const UserUpdate = () => {
	const { register, handleSubmit } = useForm();
	const user = useSelector(state => state.user? state.user : {})
	const status = useSelector(state => state.user && state.user.status ? state.user.status : {})
	const dispatch = useDispatch()

	const breadcrumbs = [
		{
			to: '/user/dashboard',
			title: 'Dashboard',
		},
		{
			to: `/user/update`,
			title: 'Update Profile',
		},
	]

	useEffect(() => {
		dispatch(getUser())
	}, [])

	const onHandleSubmit = (value) => {
		const myUser = {
			...user,
			...value.user
		}
		dispatch(updateUser(myUser))
	}

	const UserInfoForm = () => (
		<div className="col-12 col-md-6 mx-auto mt-0 login-container">
			<div className="mt-5">
				<Form onSubmit={handleSubmit(onHandleSubmit)} >
					<Alert variant="danger" dismissible="true" show={status.isError && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
					<Alert variant="success" dismissible="true" show={status.isSuccess && status.successMessage ? true: false}>
						{status.successMessage} Go to <Link to="/user/dashboard">Dashboard.</Link>
					</Alert>

					{/* USER INFORMATION */}
					<div className='d-flex flex-row justify-content-between align-items-center heading-underlined mb-4'>
						<h5>User Information</h5>
					</div>
					<Form.Group controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control 
						defaultValue={user.name} 
						name="name"
						type="text" 
						{...register("user.name")}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control 
						defaultValue={user.email} 
						type="email" 
						name="email"
						{...register("user.email")}
						/>
					</Form.Group>

					{/* SHIPPING INFORMATION */}
					<div className='d-flex flex-row justify-content-between align-items-center heading-underlined mb-4 mt-4'>
						<h5>Contact Information</h5>
					</div>
					<Form.Group controlId="formBasicName">
						<Form.Label>Address</Form.Label>
						<Form.Control 
						defaultValue={user.contact_info.address} 
						type="text" 
						name="address"s
						as="textarea" 
						rows={3}
						{...register("user.contact_info.address")}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicName">
						<Form.Label>Phone</Form.Label>
						<Form.Control 
						defaultValue={user.contact_info.phone} 
						type="text" 
						name="phone"
						{...register("user.contact_info.phone")}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicName">
						<Form.Label>Zip Code</Form.Label>
						<Form.Control 
						defaultValue={user.contact_info.zipcode} 
						type="text" 
						name="zipcode"
						{...register("user.contact_info.zipcode")}
						/>
					</Form.Group>

					{/* PAYMENT INFORMATION */}

					<div className="mt-5">
						<Button type="submit" className="btn-primary big-btn mr-4">
							Update Account
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)

	return(
		<div>
			<Layout breadcrumbs={breadcrumbs} className="container">
				{
					user && user._id &&
					UserInfoForm()
				}
			</Layout>
		</div>
	)
}


export default UserUpdate