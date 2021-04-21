import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {ListGroup,ListGroupItem,Button,ButtonGroup,Alert} from 'react-bootstrap'

import {useSelector,useDispatch} from 'react-redux'
import {getBrands,deleteBrand,getBrand,initStatus} from '../../store/actions/brands'
import Layout from '../../core/Layout'
import editIcon from '../../assets/images/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'

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