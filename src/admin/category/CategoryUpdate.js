import React, {useEffect} from 'react'
import {Button,Form,FormGroup, FormLabel,Alert} from 'react-bootstrap'
import {Link,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getCategory,initStatus} from '../../store/actions/categories'
import { useForm } from "react-hook-form";

import Layout from '../../core/Layout'
import {updateCategory} from '../../store/actions/categories'
import categories from '../../store/reducers/categories'

const CategoryCreate = () => {

	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Admin'
		},
		{
			to: '/admin/category',
			title: 'Category'
		},
		{
			to: '/admin/category/new',
			title: 'New'
		}
	]

	const {id} = useParams()
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	
	const status = useSelector(state => state.categories.status? state.categories.status: {})
	const category = useSelector(state => state.categories.category? state.categories.category: {})

	
	useEffect(() => {
		dispatch(initStatus())
		if(categories.length <= 0) dispatch(getCategory(id))
	},[dispatch,id])

	


	const onFormSubmitHandler = (data) => {
		console.log(data)
		const payload = category
		payload.name = data.name ? data.name : category.name
		dispatch(updateCategory(id,payload))
	}

	const showCategoryForm = (categories) => (
		<Form onSubmit={handleSubmit(onFormSubmitHandler)}>
			<FormGroup>
				<FormLabel>
					Category Name
				</FormLabel>
				<input
					className="form-control"
					defaultValue={category.name}
					placeholder="Category Name"
					{...register("name")}>	
				</input>
			</FormGroup>
			<Button type="submit" className="big-btn" variant="primary">Update</Button>
		</Form>
	
	)

	const showSuccessAlert = () => (
		<Alert variant="success" dismissible="true" show={status.isSuccess && status.successMessage ? true: false}>{status.successMessage}
		 Go to <Link to="/admin/category">Category List.</Link>
		</Alert>
	)
	const showErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={status.isError && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
	)

	return (
		<Layout breadcrumbs={breadcrumbs} className="container py-5 my-5">
			<div>
				<div className="row">
					<div className="col-12">
					</div>
					<div className="col-12 col-md-6 mx-auto">
						<div className="d-flex flex-row justify-content-between">
							<h1 className="heading">New Category</h1>
						</div>
						<div className="py-5">
							{showSuccessAlert()}
							{showErrorAlert()}
							{showCategoryForm()}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)

}

export default CategoryCreate;