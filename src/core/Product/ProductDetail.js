import React, {useEffect} from 'react'
import {useIsBigScreen,useIsSmallScreen} from '../../hooks/media'
import {useDispatch,useSelector} from 'react-redux'
import { motion, AnimatePresence } from "framer-motion"
import {useParams} from 'react-router'

import {
	Badge,
	Button
} from 'react-bootstrap'

import {
	getProduct,
	getRelatedProducts
} from '../../store/actions/products'

import Layout from '../Layout'
import Product from '../../components/Product/Product'
import styles from './ProductDetail.module.scss'



const ProductDetail = () => {

	const {id} 				= useParams()
	const dispatch			 = useDispatch()
	const isBigScreen 		= useIsBigScreen()
	const isSmallScreen 	= useIsSmallScreen()

	const product = useSelector(state => state.products.product ? state.products.product : {})
	const related_products = useSelector(state => state.products.related_products ? state.products.related_products : [])

	useEffect(() => {
		dispatch(getProduct(id))
		dispatch(getRelatedProducts(id))
		window.scrollTo(0, 0)
	},[dispatch,id])

	const showProductPhoto = () => (
		<div className="text-center">
			<img className={styles.productImage} src={product.url} alt={product.name}></img>
			{
				product.discount_price ? <Badge variant="danger" className={styles.saleBadge}>Sale</Badge> : ''
			}
		</div>
	)

	const currencyFormatter = (str) => {
		return  str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
	}

	const showProductDetails = () => (
		<div>
			{
				product.brand && 
				<div>
					<Badge className={styles.brandBadge}>{product.brand ? product.brand.name : '-'}</Badge>
				</div>
			}
			<h2>{product.name}</h2>
			<p className={styles.description}>{product.description}</p>
			<div className="d-flex flex-row align-items-center">
				<div className="d-flex flex-column my-4">
					{
						product.discount_price >0 && 
						<p className={`${styles.oldPrice} mr-3`}>{currencyFormatter(product.price)} MMK</p>
					}
					<p className={`${styles.price}`}>{currencyFormatter(product.discount_price ? product.discount_price : product.price)} MMK</p>
				</div>
				<div>
					<Button className="btn-dark ml-5">Add To Cart</Button>
				</div>
			</div>
			
		</div>
	)

	const showReatedProduct = () => (
		related_products.map((item,index) => {
			return (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{easings:'easeInOut'}}
						className={`my-3 ${isBigScreen ? 'col-3' : isSmallScreen ? 'col-4' : 'col-6'}`} key={`${item._id}`}
					>
						<Product item={item} key={index}></Product>
					</motion.div>
				</AnimatePresence>
			)
		})
	)

	return (
		<div>
			<Layout className="container py-5 my-5 px-5">
				<div className="py-5 my-5">
					{
						product && 
						<div className="row mt-5">
							<div className="col-12 col-lg-5 col-md-6 d-flex align-items-center justify-content-center">
								{showProductPhoto()}
							</div>
							<div className="col-12 col-lg-5 col-md-6 offset-lg-1 my-5">
								{showProductDetails()}
							</div>
						</div>
					}
					{
							related_products.length >0 && 
							<div className="mt-5 pt-5">
								<h4 className={styles.sectionTitle}>Reated Products</h4>
								<div className="row">
									{showReatedProduct()}
								</div>
							</div>
					}
				</div>
			</Layout>
		</div>
	)

}

export default ProductDetail