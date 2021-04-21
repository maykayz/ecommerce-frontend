import {
	CREATE_BRAND,
	UPDATE_BRAND,
	DELETE_BRAND,
	GET_BRANDS,
	GET_BRAND,
	ERROR,
	LOADING,
	INIT_STATUS
  } from "../types/brands";

const initialState = {
	brands: [],
	brand: {},
	status: {
		isSuccess: false,
		isError: false,
		loading:false,
		successMessage: '',
		errorMessage: ''
	}
}

const brands = (state = initialState,action) => {
	switch(action.type){
		case CREATE_BRAND: {
			const {brand} = action
			return {
				...state,
				brands: [
					...state.brands,
					brand,
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Brand Created Successfully!'
				}
			}
		}
		case UPDATE_BRAND: {
			const {brand} = action
			return {
				...state,
				brands: [
					...state.brands.map(item => {
						if(item._id === brand._id){
							item.name = brand.name
						}
						return item
					})
				],
				brand: brand,
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Brand Updated Successfully!'
				},
			}
		}
		case DELETE_BRAND: {
			const {id} = action
			return{
				...state,
				brands: [
					...state.brands.filter(item => item._id !== id)
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Brand Deleted Successfully!'
				}
			}
		}
		case GET_BRANDS : {
			const {brands} = action
			return {
				...state,
				brands: [
					...brands
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false
				}
			}
		}
		case GET_BRAND : {
			const {brand} = action
			return {
				...state,
				brand: brand,
				status: {
					...state.status,
					loading: false
				}
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
		default: {
			return {
				...state
			}
		}
	}
}

export default brands 