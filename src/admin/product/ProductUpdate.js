import React, {useEffect, useState} from 'react'
import {Button,Form,FormGroup,FormControl, FormLabel,Alert} from 'react-bootstrap'
import {Link,useParams} from 'react-router-dom'

import Layout from '../../core/Layout'
import FormFileInput from 'react-bootstrap/esm/FormFileInput'
import {useForm} from 'react-hook-form'

import {useDispatch,useSelector} from 'react-redux'
import {getBrands} from '../../store/actions/brands'
import {getCategories} from '../../store/actions/categories'
import {getProduct,updateProduct} from '../../store/actions/products'

import {API_URL} from '../../config'

import newImg from '../../assets/images/add_new_img.jpg'

import styles from './Product.module.scss'

const ProductUpdate = () => {

	const dispatch = useDispatch();
	const brands = useSelector(state => state.brands.brands? state.brands.brands: [])
	const categories = useSelector(state => state.categories.categories ? state.categories.categories : [])
	const product = useSelector(state => state.products.product ? state.products.product : {})
	const status = useSelector(state => state.products.status ? state.products.status : {})
	const {id}  = useParams()
	const { register, handleSubmit } = useForm();
	const breadcrumbs = [
		{
			to: '/admin/dashboard',
			title: 'Admin'
		},
		{
			to: '/admin/product',
			title: 'Product'
		},
		{
			to: '/admin/product/new',
			title: 'New'
		}
	]

	const [values,setValues] = useState({
		name: '',
		description: '',
		price: null,
		discount_price: null,
		quantity: null,
		category: '',
		brand: '',
		photo: ''
	})

	useEffect(() => {
		dispatch(getBrands())
		dispatch(getCategories())
		dispatch(getProduct(id))
	},[dispatch,id])

	const onImageChanged = (e) => {
		const value = e.target.files[0]
		setValues({
			...values,
			photo: value,
		})
	}

	const onFormSubmitHandler = (data) => {
		
		const newProduct = product
		if(data.name) product.name = data.name 
		if(data.description) product.description = data.description 
		if(data.quantity) product.quantity = data.quantity 
		if(data.price) product.price = data.price 
		if(data.discount_price) product.discount_price = data.discount_price 
		if(data.category) product.category = data.category 
		if(data.brand) product.brand = data.brand 
		if(values.photo) product.photo = values.photo 


		dispatch(updateProduct(id,newProduct))
	}
	
	

	const showProductForm = () => (
		<Form onSubmit={handleSubmit(onFormSubmitHandler)} className="row">
			<div className="col-4">
				<FormGroup>
					{
						values.photo ? 
						<img 
							className={styles.image} 
							src={values.photo ? URL.createObjectURL(values.photo) : newImg} 
							alt="product" 
							onClick={e => {document.getElementById('image_input').click()}}
						>
						</img>:
						<img 
							className={styles.image}
							alt="product"
							src={`${API_URL}/products/${product._id}/photo`}
							onClick={e => {document.getElementById('image_input').click()}}
						></img>
					}
					
					
					<FormFileInput 
						name="photo" 
						id="image_input" 
						accept="image/*" 
						className="d-none"
						{...register("photo")}
						onChange={onImageChanged}
					>

					</FormFileInput>
				</FormGroup>
			</div>
			<div className="col-6">
				<FormGroup>
					<FormLabel id="name">
						Product Name
					</FormLabel>
					<FormControl 
						className="form-control"
						defaultValue={product.name}
						{...register("name")}
					>	
					</FormControl>
				</FormGroup>
				<FormGroup>
					<FormLabel>
						Description
					</FormLabel>
					<textarea className="form-control" 
						defaultValue={product.description}
						{...register("description")}
					>	
					</textarea>
				</FormGroup>
				<FormGroup>
					<FormLabel id="price">
						Price
					</FormLabel>
					<input 
						className="form-control"
						defaultValue={product.price}
						type="number"
						{...register("price")}
					>	
					</input>
				</FormGroup>
				<FormGroup>
					<FormLabel id="discount_price">
						Discount Price
					</FormLabel>
					<FormControl 
						type="number"
						className="form-control"
						defaultValue={product.discount_price}
						{...register("discount_price")}
						scrollable="false"
					>	
					</FormControl>
				</FormGroup>
				<FormGroup>
					<FormLabel id="quantity">
						Quantity
					</FormLabel>
					<FormControl 
						type="number"
						className="form-control"
						defaultValue={product.quantity}
						{...register("quantity")}
						scrollable="false"
					>	
					</FormControl>
				</FormGroup>
				<FormGroup>
					<FormLabel id="category">
						Category
					</FormLabel>
					<select 
						className="form-control"
						defaultValue={product.category ? product.category._id : ''}
						{...register("category")}
					>
						<option value="" disabled>Choose Category</option>
						{
							categories.map((item,index) => (
								<option value={item._id} key={index}>{item.name}</option>
							))
						}
					</select>
				</FormGroup>
				<FormGroup>
					<FormLabel id="brand">
						Brand
					</FormLabel>
					<select
						className="form-control"
						defaultValue={product.brand && product.brand._id ? product.brand._id : ''}
						{...register("brand")}
					>
						<option value="" disabled>Choose Brand</option>
						{
							brands.map((item,index) => (
								<option value={item._id} key={index}>{item.name}</option>
							))
						}
					</select>
				</FormGroup>
				<Button type="submit" className="big-btn" variant="primary">Update</Button>
			</div>
		</Form>
	
	)

	const showSuccessAlert = () => (
		<Alert variant="success" dismissible="true" show={status.success && status.successMessage ? true: false}>Product Updated Successfully.
		 Go to <Link to="/admin/product">Product List.</Link>
		</Alert>
	)
	const showErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={status.error && status.errorMessage ? true: false}>{status.errorMessage}</Alert>
	)

	return (
		<Layout breadcrumbs={breadcrumbs} className="container py-5 my-5">
			<div>
				<div className="row">
					<div className="col-12">
					</div>
					<div className="col-12 mx-auto">
						<div className="d-flex flex-row justify-content-between">
							<h1 className="heading">New Product</h1>
						</div>
						<div className="py-5">
							{showSuccessAlert()}
							{showErrorAlert()}
							{product._id && showProductForm()}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)

}

export default ProductUpdate;