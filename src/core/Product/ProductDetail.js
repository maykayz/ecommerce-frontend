import React, {useEffect} from 'react'
import {useIsBigScreen,useIsSmallScreen} from '../../hooks/media'
import {useSelector,useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart'
import { motion, AnimatePresence } from "framer-motion"
import {useParams} from 'react-router'
import swal from 'sweetalert';

import {
	Badge
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
	const dispatch			= useDispatch()
	const isBigScreen 		= useIsBigScreen()
	const isSmallScreen 	= useIsSmallScreen()

	const product = useSelector(state => state.products.product ? state.products.product : {})
	const status = useSelector(state => state.products.status ? state.products.status : {})
	const related_products = useSelector(state => state.products.related_products ? state.products.related_products : [])
	

	useEffect(() => {
		dispatch(getProduct(id))
		dispatch(getRelatedProducts(id))
	},[dispatch,id])

	const showProductPhoto = () => (
		<AnimatePresence key="show_product_photo">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{easings:'easeInOut',duration:0.8}}
				className="text-center"
			>
				<img className={styles.productImage} src={product.url} alt={product.name}></img>
				{
					product.discount_price ? <Badge variant="danger" className={styles.saleBadge}>Sale</Badge> : ''
				}
			</motion.div>
		</AnimatePresence>
	)

	const currencyFormatter = (str) => {
		return  str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
	}

	const addToCartHandler = (item) => (e) => {
		e.preventDefault()
		e.stopPropagation()
		dispatch(addToCart(item))
		swal({
			text: `${item.name} has been added to cart.`,
			icon: "success",
			button: {
				text: "Continue Shopping",
				class: "btn btn-primary"
			},
		});
	}

	const showProductDetails = () => (
		<div>
			<AnimatePresence key="show_product_details">
				<motion.div
					initial={{  opacity: 0 }}
					animate={{  opacity: 1}}
					exit={{  opacity: 0 }}
					transition={{easings:'easeInOut',duration:0.8,delay:0.3}}
					key="brand_badge"
				>
				{
					product.brand && 
					<div>
						<Badge className={styles.brandBadge}>{product.brand ? product.brand.name : '-'}</Badge>
					</div>
				}
				</motion.div>
				<motion.div
					initial={{ x: 100, opacity: 0 }}
					animate={{ x: 0 , opacity: 1}}
					exit={{ x: 100, opacity: 0 }}
					transition={{easings:'easeInOut',duration:0.8,delay:0.5}}
					key="product_name"
				>
					<h2>{product.name}</h2>
				</motion.div>
				<motion.div
					initial={{opacity: 0 }}
					animate={{opacity: 1}}
					exit={{opacity: 0 }}
					transition={{easings:'easeInOut',duration:0.8,delay:0.8}}
					key="description"
				>
					<p className={styles.description}>{product.description}</p>
				</motion.div>
				<div className="d-flex flex-row align-items-center">
					<motion.div
						initial={{opacity: 0 }}
						animate={{opacity: 1}}
						exit={{opacity: 0 }}
						transition={{easings:'easeInOut',duration:0.8,delay:1.2}}
						className="d-flex flex-column my-4"
						key="price"
					>
						{
							product.discount_price >0 && 
							<p className={`${styles.oldPrice} mr-3`}>{currencyFormatter(product.price)} MMK</p>
						}
						<p className={`${styles.price}`}>{currencyFormatter(product.discount_price ? product.discount_price : product.price)} MMK</p>
					</motion.div>
					<div>
					<motion.button
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0 }}
						transition={{easings:'easeInOut',duration:0.8,delay:1.6}}
						className="btn btn-dark ml-5"
						key="cart"
						onClick={addToCartHandler(product)}
					>
						Add To Cart
					</motion.button>
					</div>
				</div>
			</AnimatePresence>
			
		</div>
	)

	const showReatedProduct = () => (
		related_products.map((item,index) => {
			return (
				<AnimatePresence key={index}>
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
				{
					status.isSuccess && 
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
							related_products.length > 0 && 
							<div className="mt-5 pt-5">
								<h4 className={styles.sectionTitle}>Reated Products</h4>
								<div className="row">
									{showReatedProduct()}
								</div>
							</div>
					}
				</div>
				}
				{
					status.isError &&
					<div style={{marginTop: '36vh'}}>
						<h2 className="font-lato text-center m-4">
							Sorry....!!
						</h2>
						<h6 className="font-lato text-center">Something went wrong with this web page.</h6>
					</div>
				}
			</Layout>
		</div>
	)

}

export default ProductDetail