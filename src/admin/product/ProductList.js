import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {ListGroup,ListGroupItem,Button,ButtonGroup,Alert,Pagination} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {getProducts,deleteProduct} from '../../store/actions/products'

import Layout from '../../core/Layout'
import editIcon from '../../assets/images/edit.svg'
import deleteIcon from '../../assets/images/delete.svg'
import dummyImage from '../../assets/images/dummy.jpg'

const ProductList = () => {

	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Admin',
		},
		{
			to: '/admin/product',
			title: 'Product',
		}
	]

	const dispatch = useDispatch()
	const initialStatus = {
		isSuccess: false,
		isError: false,
		loading:false,
		successMessage: '',
		errorMessage: ''
	}
	const products = useSelector(state => state.products.products ? state.products.products : [])
	const total = useSelector(state => state.products.total ? state.products.total : 0)
	const status = useSelector(state => state.products.status ? state.products.status : initialStatus)
	const limit = 10
	const [currentPage,setCurrentPage] = useState(1)
	

	useEffect(() => {
		dispatch(getProducts({
			sortBy: 'createdAt',
			orderBy: 'desc',
			limit: limit,
			currentPage: 1,
		}))
	},[dispatch])

	const getProductList = (page) => {
		dispatch(getProducts({
			sortBy: 'createdAt',
			orderBy: 'desc',
			limit: limit,
			currentPage: page,
		}))
	}

	const onDeleteHandle = (id) => (e) => {
		console.log(id)
		e.preventDefault()
		dispatch(deleteProduct(id))
	}

	const showSuccessAlert = () => (
		<Alert variant="success" dismissible="true" show={status.isSuccess && status.successMessage ? true: false}>{status.successMessage}
		</Alert>
	)
	const showErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={status.isError && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
	)

	const showProductList = () => (
		<ListGroup>
			{
				products.map((item,index) => (
					<ListGroupItem key={index}>
						<div className="d-flex flex-row justify-content-between align-items-center">
							<div className="row align-items-center"> 
								{
									item.url ?
									<img className="px-1" style={{width: '50px'}} src={item.url} alt={item.name}></img>
									:
									<img className="px-1" style={{width: '50px'}} src={dummyImage} alt="dummy"></img>
								}
								<p className="px-1 my-0">{item.name}</p>
							</div>
							<ButtonGroup>
								<Link className="btn btn-outline-primary" to={`/admin/product/${item._id}`}>
									<img style={{width:'15px'}} src={editIcon} alt="Edit Icon"></img>
								</Link>
								<Button variant="outline-primary" onClick={onDeleteHandle(item._id)}>
									<img style={{width:'15px'}} src={deleteIcon} alt="Delete Icon"></img>
								</Button>
							</ButtonGroup>
						</div>
					</ListGroupItem>
				))
			}
		</ListGroup>
	)

	const showPagination = () => {
		let pageList = []
		let totalPages = total/limit;
		if(total%limit > 0){
			totalPages++
		}
		for (let i=1;i<=totalPages;i++){
			pageList.push(i)
		}
		const paginationChanged = (item) => (e) => {
			setCurrentPage(item)
			getProductList(item)
		}
		return (
			<Pagination className="mt-5">
				<Pagination.First />
				<Pagination.Prev />
					{
						pageList.map(item => 
						(
							<Pagination.Item 
								active={item === currentPage ? 'active': ''} 
								onClick={paginationChanged(item)}
								key={item}
							>
								{item}
							</Pagination.Item>))
					}
				<Pagination.Next />
				<Pagination.Last />
			</Pagination>
		)
	}

	return (
		<Layout breadcrumbs={breadcrumbs} className="container py-5 my-5">
			<div>
				<div className="row">
					<div className="col-12">
						<div className="d-flex flex-row justify-content-between">
							<h1 className="heading">Products</h1>
							<div>
								<Link className="btn btn-primary big-btn" to="/admin/product/new">+ Add New Product</Link>
							</div>
						</div>
					</div>
					<div className="col-12">
						{showSuccessAlert()}
						{showErrorAlert()}
						{status.loading && <div className="text-center">Loading...</div>}
						{
							!status.loading && products.length &&
							(
								<div className="py-5">
									{showProductList()}
									{showPagination()}
								</div>
							)
						}
					</div>
				</div>
			</div>
		</Layout>
	)

}

export default ProductList;