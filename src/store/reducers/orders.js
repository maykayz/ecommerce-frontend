import {
	GET_ORDERS,
	ADD_ORDER,
	UPDATE_ORDER,
	CANCEL_ORDER,
	ERROR,
	LOADING,
	INIT_STATUS
  } from "../types/orders";


const initialState = {
	orders: [],
	status: {
		isSuccess: false,
		isError: false,
		loading:false,
		successMessage: '',
		errorMessage: ''
	}
}

const order = (state = initialState,action) => {
	switch(action.type){
		case GET_ORDERS: {
			const {orders} = action
			return {
				...state,
				orders: [
					...orders
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Order Created Successfully!'
				}
			}
		}
		case ADD_ORDER: {
			const {order} = action
			return {
				...state,
				orders: [
					...state.orders,
					order
				]
			}
		}
		case UPDATE_ORDER: {
			return {
				...state
			}
		}
		case CANCEL_ORDER: {
			return {
				...state
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

export default order 