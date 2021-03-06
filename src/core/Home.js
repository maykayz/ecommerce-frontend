import React, {useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { motion, AnimatePresence } from "framer-motion"

import {useIsBigScreen,useIsTabletScreen,useIsSmallScreen} from '../hooks/media'
import Layout from './Layout'
import {getProducts} from '../store/actions/products'
import {getCategories} from '../store/actions/categories'
import {getBrands} from '../store/actions/brands'
import {Pagination,FormCheck,FormGroup,Button} from 'react-bootstrap'
import Product from '../components/Product/Product'

const Home = () => {

	const searchParams = document.location.search.split('?keyword=')[1]

	const isBigScreen 		= useIsBigScreen()
	const isTabletScreen	= useIsTabletScreen()
	const isSmallScreen 	= useIsSmallScreen()
	const dispatch 			= useDispatch()

	const categories 	= useSelector(state 	=> state.categories.categories 	? state.categories.categories : [])
	const brands 		= useSelector(state 	=> state.brands.brands 			? state.brands.brands : [])
	const products 		= useSelector(state 	=> state.products.products 		? state.products.products : [])
	const total 		= useSelector(state 	=> state.products.total 		? state.products.total : 0)
	const status 		= useSelector(state 	=> state.products.status 		? state.products.status : initialStatus)

	const initialStatus = {
		isSuccess: false,
		isError: false,
		loading:false,
		successMessage: '',
		errorMessage: ''
	}
	const initialFilter = {
		category : [],
		brand: [],
		price: '',
		sortBy: 'createdAt',
		orderBy: 'desc',
		limit: 12,
	}

	const [filters, setFilters] = useState(initialFilter)
	const [currentPage, setCurrentPage] = useState(1)
	

	useEffect(() => {
		dispatch(getCategories())
		dispatch(getBrands())
	},[dispatch])

	useEffect(() => {
		dispatch(getProducts({
			...initialFilter,
			keyword:searchParams
		}))
	},[dispatch,searchParams])

	const showProductList = () => (
		products.map((item,index) => {
			return (
				<AnimatePresence key={index}>
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

	const showPagination = () => {
		let pageList = []
		let totalPages = parseInt(total / filters.limit);
		if(total % filters.limit > 0){
			totalPages += 1
		}
		for (let i=1;i<=totalPages;i++){
			pageList.push(i)
		}
		const paginationChanged = (item) => (e) => {
			if(item > 0 && item <= totalPages && item !== currentPage){
				setCurrentPage(item)
				dispatch(getProducts({
					...filters,
					currentPage: item
				}))
			}
		}
		return (
			<Pagination className="mt-5">
				<Pagination.First onClick={paginationChanged(1)}/>
				<Pagination.Prev onClick={paginationChanged(currentPage - 1)}/>
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
				<Pagination.Next onClick={paginationChanged(currentPage + 1)}/>
				<Pagination.Last onClick={paginationChanged(totalPages)}/>
			</Pagination>
		)
	}

	const onFilterChanged = (name) => (e) => {
		let {value} = e.target
		if(name !== 'price'){
			if(filters[name].filter(item => item === value).length === 0){
				setFilters({
					...filters,
					[name]: [
						...filters[name],
						value
					]
				})
			}else{
				setFilters({
					...filters,
					[name]: [
						...filters[name].filter(item => item !== value)
					]
				})
			}
		}else{
			setFilters({
				...filters,
				[name]: value
			})
		}
	}

	const onHandleFilter = (e) => {
		e.preventDefault()
		setFilters({
			...filters
		})
		setCurrentPage(1)
		dispatch(getProducts({
			...filters,
			currentPage: 1
		}))
	}
	const onHandleClear = (e) => {
		e.preventDefault()
		setFilters({
			...initialFilter
		})
		dispatch(getProducts(initialFilter))
	}
	const showCategoryFilter = () => {

		return (
			<div>
				<h6 className="font-bold pt-3 pb-1">Filter By Categories</h6>
						{/* <FormCheck className="pb-1">
							<FormCheck.Input value={'All'} checked={filters.category.indexOf('All') >= 0? true : false} onChange={onFilterChanged('category')}></FormCheck.Input>
							<FormCheck.Label>All</FormCheck.Label>
						</FormCheck> */}
					{
						categories.length && 
						categories.map(item => (
							<FormCheck className="pb-1" key={item._id}>
								<FormCheck.Input value={item._id} checked={filters.category.indexOf(item._id) >= 0? true : false}  onChange={onFilterChanged('category')}></FormCheck.Input>
								<FormCheck.Label>{item.name}</FormCheck.Label>
							</FormCheck>
						))
					}
			</div>
		)
	}

	const showBrandFilter = () => {

		return (
			<div>
				<h6 className="font-bold pt-5 pb-1">Filter By Brands</h6>
					{/* <FormCheck className="pb-1">
						<FormCheck.Input value={'All'} checked={filters.brand.indexOf('All') >= 0? true : false}  onChange={onFilterChanged('brand')}></FormCheck.Input>
						<FormCheck.Label>All</FormCheck.Label>
					</FormCheck> */}
					{
						brands.length && 
						brands.map(item => (
							<FormCheck className="pb-1"s key={item._id}>
								<FormCheck.Input value={item._id} checked={filters.brand.indexOf(item._id) >= 0? true : false}  onChange={onFilterChanged('brand')}></FormCheck.Input>
								<FormCheck.Label>{item.name}</FormCheck.Label>
							</FormCheck>
						))
					}
			</div>
		)
	}

	const showPriceFilter = () => {

		return (
			<div>
				<h6 className="font-bold pt-5 pb-1">Filter By Price</h6>
				<FormGroup>
					<FormCheck className="pb-1" >
						<FormCheck.Input type="radio" name="price" value='0,100000' checked={filters.price === '0,100000' ? true : false}  onChange={onFilterChanged('price')}></FormCheck.Input>
						<FormCheck.Label>0 - 100,000 Ks</FormCheck.Label>
					</FormCheck>
					<FormCheck className="pb-1" >
						<FormCheck.Input type="radio" name="price" value='100001,200000' checked={filters.price === '100001,200000' ? true : false}  onChange={onFilterChanged('price')}></FormCheck.Input>
						<FormCheck.Label>100,001 Ks - 200,000 Ks</FormCheck.Label>
					</FormCheck>
					<FormCheck className="pb-1" >
						<FormCheck.Input type="radio" name="price" value='200001,300000' checked={filters.price === '200001,300000' ? true : false}  onChange={onFilterChanged('price')}></FormCheck.Input>
						<FormCheck.Label>200,001 Ks - 300,000 Ks</FormCheck.Label>
					</FormCheck>
					<FormCheck className="pb-1" >
						<FormCheck.Input type="radio" name="price" value='300000' checked={filters.price === '300000' ? true : false}  onChange={onFilterChanged('price')}></FormCheck.Input>
						<FormCheck.Label>300,001 Ks - Above</FormCheck.Label>
					</FormCheck>
				</FormGroup>
				<Button variant="primary" className="mr-2" onClick={onHandleFilter}>Filter</Button>
				<Button variant="outline-primary" onClick={onHandleClear}>Clear</Button>
			</div>
		)
	}

	return(
		<div>
			<Layout className="py-5 my-5 px-5">
				<div className="py-5">
					<div className="row">
						<div className={isBigScreen ? 'col-2' : isTabletScreen ? 'col-3' : 'd-none'}>
							{searchParams}
							{showCategoryFilter()}
							{showBrandFilter()}
							{showPriceFilter()}
						</div>
						{status.loading && <div className="text-center">Loading ...</div>}
						{
							products.length ?
							(
								<div className={isBigScreen ? 'col-10' : isTabletScreen ? 'col-9' : 'col-12'}>
									<div className="row">
										{showProductList()}
									</div>
									<div className="row">
										{showPagination()}
									</div>
								</div>
							):
							(
								<div className="py-5 my-5 text-center mx-auto">No data found...!</div>
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


export default Home