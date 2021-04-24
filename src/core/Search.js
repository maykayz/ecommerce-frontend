import React, {useEffect} from 'react'
import {useIsBigScreen,useIsSmallScreen} from '../hooks/media'
import {useDispatch,useSelector} from 'react-redux'
import { motion, AnimatePresence } from "framer-motion"

import Layout from './Layout'
import {getProducts} from '../store/actions/products'
import Product from '../components/Product/Product'

const Search = () => {

	const keyword = document.location.search.split('?keyword=')[1]

	const isBigScreen 		= useIsBigScreen()
	const isSmallScreen 	= useIsSmallScreen()
	const dispatch 			= useDispatch()

	const products 			= useSelector(state 	=> state.products.products 		? state.products.products : [])
	const total 			= useSelector(state 	=> state.products.total 		? state.products.total : 0)
	const status 			= useSelector(state 	=> state.products.status 		? state.products.status : initialStatus)
	
	const initialStatus 	= {
		isSuccess: false,
		isError: false,
		loading:false,
		successMessage: '',
		errorMessage: ''
	}

	const initialFilter 	= {
		category : [],
		brand: [],
		price: '',
		sortBy: 'createdAt',
		orderBy: 'desc',
		limit: 12,
	}

	useEffect(() => {
		dispatch(getProducts({
			...initialFilter,
			keyword:keyword
		}))
	},[keyword,dispatch])

	const showProductList = () => (
		products.map((item,index) => {
			return (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{easings:'easeOut'}}
						className={`my-3 ${isBigScreen ? 'col-3' : isSmallScreen ? 'col-4' : 'col-6'}`} key={`${item._id}`}
					>
						<Product item={item} key={index}></Product>
					</motion.div>
				</AnimatePresence>
				
			)
		})
	)

	return(
		<div>
			<Layout className="py-5 my-5 px-5">
				<div className="py-5">
					<div className="row">
						{status.loading && <div className="text-center">Loading ...</div>}
						{
							products.length ?
							(
								<div className='col-12'>
									<div className="row">
										<p className="px-3">Total {total} products found for keyword <span className="font-bold">{keyword}.</span></p>
									</div>
									<div className="row">
										{showProductList()}
									</div>
								</div>
							):
							(
								<div class="px-3">No product found for <span className="font-bold">{keyword}.</span></div>
							)
						}
						{
							status.isError && status.errorMessage &&
							(
								<div>{status.errorMessage}</div>
							)
						}
					</div>
				</div>
			</Layout>
		</div>
	)

}


export default Search