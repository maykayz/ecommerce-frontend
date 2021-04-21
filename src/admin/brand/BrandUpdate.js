import React, {useEffect} from 'react'
import {Button,Form,FormGroup, FormLabel,Alert} from 'react-bootstrap'
import {Link,useParams,withRouter} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useForm } from "react-hook-form";

import {updateBrand,initStatus,getBrand} from '../../store/actions/brands'


import Layout from '../../core/Layout'

const BrandUpdate = ({history}) => {
	const {id} = useParams()
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	
	const status = useSelector(state => state.brands.status? state.brands.status: {})
	const brand = useSelector(state => state.brands.brand? state.brands.brand: {})

	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Admin'
		},
		{
			to: '/admin/brand',
			title: 'Brand'
		},
		{
			to: '/admin/brand/new',
			title: 'New'
		}
	]

	useEffect(() => {
		dispatch(initStatus())
		dispatch(getBrand(id))
	},[dispatch,id])

	const onFormSubmitHandler = (data) => {
		const payload = brand
		payload.name = data.name
		dispatch(updateBrand(id,payload))
	}

	const showBrandForm = (brands) => (
		<Form onSubmit={handleSubmit(onFormSubmitHandler)}>
			<FormGroup>
				<FormLabel id="name">
					Brand Name
				</FormLabel>
				<input  
					className="form-control"
					defaultValue={brand.name}
					placeholder="Brand Name"
					{...register("name")}>	
				</input>
			</FormGroup>
			<Button type="submit" className="big-btn" variant="primary" disabled={status.loading}>Update</Button>
		</Form>
	
	)

	const showSuccessAlert = () => (
		<Alert variant="success" dismissible="true" show={status.isSuccess ? true: false}>{status.successMessage}
		 Go to <Link to="/admin/brand">Brand List.</Link>
		</Alert>
	)
	const showErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={status.isError === true && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
	)

	return (
		<Layout breadcrumbs={breadcrumbs} className="container py-5 my-5">
			<div>
				<div className="row">
					<div className="col-12">
					</div>
					<div className="col-12 col-md-6 mx-auto">
						<div className="d-flex flex-row justify-content-between">
							<h1 className="heading">Update Brand</h1>
						</div>
						<div className="py-5">
							{showSuccessAlert()}
							{showErrorAlert()}
							{showBrandForm()}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)

}

export default withRouter(BrandUpdate);