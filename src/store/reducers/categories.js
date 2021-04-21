import {
	CREATE_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
	GET_CATEGORIES,
	GET_CATEGORY,
	ERROR,
	LOADING,
	INIT_STATUS
  } from "../types/categories";

const initialState = {
	categories: [],
	category: {},
	status: {
		isSuccess: false,
		isError: false,
		loading:false,
		successMessage: '',
		errorMessage: ''
	}
}

const categories = (state = initialState,action) => {
	switch(action.type){
		case CREATE_CATEGORY: {
			const {category} = action
			return {
				...state,
				categories: [
					...state.categories,
					category,
				],
				category: category,
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Category Created Successfully!'
				}
			}
		}
		case UPDATE_CATEGORY: {
			const {category} = action
			return {
				...state,
				categories: [
					...state.categories.map(item => {
						if(item._id === category._id){
							item.name = category.name
						}
						return item
					})
				],
				category: category,
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Category Updated Successfully!'
				}
			}
		}
		case DELETE_CATEGORY: {
			const {_id} = action
			return{
				...state,
				categories: [
					...state.categories.filter(item => item._id !== _id)
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Category Deleted Successfully!'
				}
			}
		}
		case GET_CATEGORIES : {
			const {categories} = action
			return {
				...state,
				categories: [
					...categories
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false
				}
			}
		}
		case GET_CATEGORY : {
			const {category} = action
			return {
				...state,
				category: category
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

export default categories 