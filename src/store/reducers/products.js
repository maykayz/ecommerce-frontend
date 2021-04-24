import {
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	GET_PRODUCTS,
	GET_PRODUCT,
	ERROR,
	LOADING,
	INIT_STATUS,
	SET_KEYWORD,
	GET_RELATED_PRODUCTS
  } from "../types/products";

const initialState = {
	products: [],
	related_products: [],
	total: 0,
	totalPage: 0,
	currentPage: 1,
	product: {},
	status: {
		isSuccess: false,
		isError: false,
		loading:false,
		successMessage: '',
		errorMessage: ''
	},
	keyword: ''
}

const products = (state = initialState,action) => {
	switch(action.type){
		case CREATE_PRODUCT: {
			const {product} = action
			return {
				...state,
				products: [
					...state.products,
					product,
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Product Created Successfully!'
				}
			}
		}
		case UPDATE_PRODUCT: {
			const {product} = action
			return {
				...state,
				products: [
					...state.products.map(item => item._id === product._id ? product : item)
				],
				product: product,
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Product Updated Successfully!'
				}
			}
		}
		case DELETE_PRODUCT: {
			const {id} = action
			return{
				...state,
				products: [
					...state.products.filter(item => item._id !== id)
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Product Deleted Successfully!'
				}
			}
		}
		case GET_PRODUCTS : {
			const {products,total,totalPage,currentPage} = action
			return {
				...state,
				products: [
					...products
				],
				total: total,
				totalPage: totalPage,
				currentPage: currentPage ? currentPage : 1,
				status: {
					...state.status,
					isSuccess: true,
					loading: false
				},
			}
		}
		case GET_RELATED_PRODUCTS: {
			const {products} = action
			return {
				...state,
				related_products: products,
				status: {
					...state.status,
					isSuccess: true,
					loading: false
				},
			}
		}
		case GET_PRODUCT : {
			const {product} = action
			return {
				...state,
				product: product
			}
		}
		case ERROR : {
			const {status} = action
			return {
				...state,
				status: {
					...state.status,
					isSuccess: false,
					loading: false,
					isError: true,
					successMessage: '',
					errorMessage: status.errorMessage
				}
			}
		}
		case LOADING : {
			return {
				...state,
				status: {
					...state.status,
					isSuccess: false,
					loading: true,
					isError: false,
					successMessage: '',
					errorMessage: ''
				}
			}
		}
		case INIT_STATUS: {
			return{
				...state,
				status: {
					isSuccess: false,
					isError: false,
					loading:false,
					successMessage: '',
					errorMessage: ''
				}
			}
		}
		case SET_KEYWORD: {
			const {keyword} = action
			return {
				...state,
				keyword: keyword
			}
		}
		default: {
			return {
				...state
			}
		}
	}
}

export default products 