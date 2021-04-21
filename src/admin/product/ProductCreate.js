import React, {useEffect, useState} from 'react'
import {Button,Form,FormGroup,FormControl, FormLabel,Alert} from 'react-bootstrap'
import {createProduct} from '../../services/product'
import {Link} from 'react-router-dom'

import Layout from '../../core/Layout'
import FormFileInput from 'react-bootstrap/esm/FormFileInput'

import {useDispatch,useSelector} from 'react-redux'
import {getBrands} from '../../store/actions/brands'
import {getCategories} from '../../store/actions/categories'

import newImg from '../../assets/images/add_new_img.jpg'

import styles from './Product.module.scss'

const ProductCreate = () => {

	const dispatch = useDispatch();
	const brands = useSelector(state => state.brands.brands? state.brands.brands: [])
	const categories = useSelector(state => state.categories.categories ? state.categories.categories : [])
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
		price: 0,
		discount_price: 0,
		quantity: 0,
		category: '',
		brand: '',
		photo: ''
	})
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const [busy, setBusy] = useState(false)

	useEffect(() => {
		dispatch(getBrands())
		dispatch(getCategories())

	},[dispatch])

	const onHandleChange = (name) => (e) => {
		console.log(name)
		const value = name === 'photo' ? e.target.files[0] : e.target.value
		
		setValues({
			...values,
			[name]: value,
		})
		console.log(value)
	}

	const onFormSubmitHandler = (e) => {
		e.preventDefault()
		setSuccess(false)
		setError('')
		setBusy(true)

		const formData = new FormData()
		formData.set('name',values.name)
		formData.set('description',values.description)
		formData.set('quantity',values.quantity)
		formData.set('price',values.price)
		formData.set('discount_price',values.discount_price)
		formData.set('category',values.category)
		formData.set('brand',values.brand)
		formData.set('photo',values.photo)

		createProduct(formData).then(res =>{
			setSuccess(true)
			setBusy(false)
		}).catch(err => {
			if(err.response){
				setError(err.response.data.error)
			}else{
				setError('Error Creating Product!')
			}
			setBusy(false)
		})
	}

	const showProductForm = () => (
		<Form onSubmit={onFormSubmitHandler} className="row">
			<div className="col-4">
				<FormGroup>
					<img className={styles.image} src={values.photo ? URL.createObjectURL(values.photo) : newImg} alt="product" onClick={e => {document.getElementById('image_input').click()}}></img>
					<FormFileInput name="photo" id="image_input" accept="image/*" onChange={onHandleChange('photo')} className="d-none">

					</FormFileInput>
				</FormGroup>
			</div>
			<div className="col-6">
				<FormGroup>
					<FormLabel id="name">
						Product Name
					</FormLabel>
					<FormControl name="name" value={values.name} onChange={onHandleChange('name')}>	
					</FormControl>
				</FormGroup>
				<FormGroup>
					<FormLabel>
						Description
					</FormLabel>
					<textarea className="form-control" name="description" value={values.description} onChange={onHandleChange('description')}>	
					</textarea>
				</FormGroup>
				<FormGroup>
					<FormLabel id="price">
						Price
					</FormLabel>
					<FormControl type="number" name="price" value={values.price} onChange={onHandleChange('price')}>	
					</FormControl>
				</FormGroup>
				<FormGroup>
					<FormLabel id="discount_price">
						Discount Price
					</FormLabel>
					<FormControl type="number" name="discount_price" value={values.discount_price} onChange={onHandleChange('discount_price')}>	
					</FormControl>
				</FormGroup>
				<FormGroup>
					<FormLabel id="quantity">
						Quantity
					</FormLabel>
					<FormControl type="number" name="quantity" value={values.quantity} onChange={onHandleChange('quantity')}>	
					</FormControl>
				</FormGroup>
				<FormGroup>
					<FormLabel id="category">
						Category
					</FormLabel>
					<select className="form-control" value={values.category} onChange={onHandleChange('category')}>
						<option disabled>Choose Category</option>
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
					<select className="form-control" value={values.brand} onChange={onHandleChange('brand')}>
						<option disabled>Choose Brand</option>
						{
							brands.map((item,index) => (
								<option value={item._id} key={index}>{item.name}</option>
							))
						}
					</select>
				</FormGroup>
				<Button type="submit" className="big-btn" variant="primary" disabled={busy}>Create</Button>
			</div>
		</Form>
	
	)

	const showSuccessAlert = () => (
		<Alert variant="success" dismissible="true" show={success ? true: false}>Product Created Successfully.
		 Go to <Link to="/admin/product">Product List.</Link>
		</Alert>
	)
	const showErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={error ? true: false}>{error}</Alert>
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
							{showProductForm()}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)

}

export default ProductCreate;