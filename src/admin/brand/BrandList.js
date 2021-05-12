import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {ListGroup,ListGroupItem,Button,ButtonGroup,Alert} from 'react-bootstrap'

import {useSelector,useDispatch} from 'react-redux'
import {getBrands,deleteBrand,getBrand,initStatus} from '../../store/actions/brands'
import Layout from '../../core/Layout'

const BrandList = ({history}) => {

	const dispatch = useDispatch()
	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Admin',
		},
		{
			to: '/admin/brand',
			title: 'Brand',
		},
	]
	
	const brands = useSelector(state => state.brands && state.brands.brands? state.brands.brands: [])
	const status = useSelector(state => state.brands && state.brands.status ? state.brands.status: {})

	useEffect(() => {
		dispatch(initStatus())
		if(brands.length <= 0){
			dispatch(getBrands())
		}
	},[dispatch,brands])


	const editHandler = (item) => (e) => {
		dispatch(getBrand(item))
		history.push(`/admin/brand/${item._id}`)

	}
	const deleteHandler = (id) => (e) => {
		e.preventDefault()
		dispatch(deleteBrand(id))
	}

	const showSuccessAlert = () => (
		<Alert variant="success" dismissible="true" show={status.isSuccess && status.successMessage ? true: false}>{status.successMessage}
		</Alert>
	)
	const showErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={status.isSuccess === false && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
	)

	const showBrandList = () => (
		<ListGroup>
			{
				
				brands.length && brands.map((item,index) => (
					<ListGroupItem key={index}>
						<div className="d-flex flex-row justify-content-between align-items-center">
							<h6 className="my-0">{item.name}</h6>
							<ButtonGroup>
								<Button variant="outline-primary" onClick={editHandler(item)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
										<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
										<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
									</svg>
								</Button>
								<Button variant="outline-primary" onClick={deleteHandler(item._id)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
										<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
										<path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
									</svg>
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
							<h1 className="heading">Brands</h1>
							<div>
								<Link className="btn btn-primary big-btn" to="/admin/brand/new">+ Add New brand</Link>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="py-5">
							{showSuccessAlert()}
							{showErrorAlert()}
							{status.loading && <div className="text-center">Loading...</div>}
							{brands.length ? showBrandList() : ''}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)

}

export default BrandList;