import React, {useState,useEffect} from 'react'
import {Button,Form,FormGroup,FormControl, FormLabel,Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {addCategory,initStatus} from '../../store/actions/categories'

import Layout from '../../core/Layout'

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

	const dispatch = useDispatch()
	const status = useSelector(state => state.categories.status? state.categories.status: {})

	const [values,setValues] = useState({
		name: ''
	})

	useEffect(() => {
		dispatch(initStatus())
	},[dispatch])

	const onNameChange = (e) => {
		setValues({
			...values,
			name: e.target.value
		})
	}

	const onFormSubmitHandler = (e) => {
		e.preventDefault()
		dispatch(addCategory(values))
	}

	const showCategoryForm = (categories) => (
		<Form onSubmit={onFormSubmitHandler}>
			<FormGroup>
				<FormLabel id="name">
					Category Name
				</FormLabel>
				<FormControl name="name" value={values.name} onChange={onNameChange}>	
				</FormControl>
			</FormGroup>
			<Button type="submit" className="big-btn" variant="primary" disabled={status.loadings}>Create</Button>
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