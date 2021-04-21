import React, {useEffect} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {ListGroup,ListGroupItem,Button,ButtonGroup,Alert} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {getCategories,deleteCategory, getCategory} from '../../store/actions/categories'

import Layout from '../../core/Layout'
import editIcon from '../../assets/images/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'
const CategoryList = ({history}) => {

	const dispatch = useDispatch()
	const categories = useSelector(state => state.categories.categories ? state.categories.categories : [])
	const status = useSelector(state => state.categories.status ? state.categories.status : [])

	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Admin',
		},
		{
			to: '/admin/category',
			title: 'Category',
		},
	]

	useEffect(() => {
		dispatch(getCategories())
	},[dispatch])


	const deleteHandler = (_id) => (e) => {
		e.preventDefault()
		dispatch(deleteCategory(_id))
	}

	const editHandler = (item) => (e) => {
		console.log(item)
		dispatch(getCategory(item._id))
		history.push(`/admin/category/${item._id}`)
	}

	const showSuccessAlert = () => (
		<Alert variant="success" dismissible="true" show={status.isSuccess && status.successMessage ? true: false}>{status.successMessage}
		</Alert>
	)
	const showErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={status.isSuccess === false && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
	)

	const showCategoryList = () => (
		<ListGroup>
			{
				categories.map((item,index) => (
					<ListGroupItem key={index}>
						<div className="d-flex flex-row justify-content-between align-items-center">
							<h6 className="my-0">{item.name}</h6>
							<ButtonGroup>
								<Button variant="outline-primary" onClick={editHandler(item)}>
									<img style={{width:'15px'}} src={editIcon} alt="Edit Icon"></img>
								</Button>
								<Button variant="outline-primary" onClick={deleteHandler(item._id)}>
									<img style={{width:'15px'}} src={deleteIcon} alt="Delete Icon"></img>
								</Button>
							</ButtonGroup>
						</div>
					</ListGroupItem>
				))
			}
		</ListGroup>
	)

	return (
		<Layout breadcrumbs={breadcrumbs} className="container py-5 my-5">
			<div>
				<div className="row">
					<div className="col-12">
						<div className="d-flex flex-row justify-content-between">
							<h1 className="heading">Categories</h1>
							<div>
								<Link className="btn btn-primary big-btn" to="/admin/category/new">+ Add New Category</Link>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="py-5">
							{showSuccessAlert()}
							{showErrorAlert()}
							{status.loading && <div className="text-center">Loading...</div>}
							{categories.length ? showCategoryList() : ''}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)

}

export default withRouter(CategoryList);