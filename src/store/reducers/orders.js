import {
	GET_ORDERS,
	GET_ORDER,
	ADD_ORDER,
	UPDATE_ORDER,
	CANCEL_ORDER,
	UPDATE_ORDER_STATUS,
	ERROR,
	LOADING,
	INIT_STATUS
  } from "../types/orders";


const initialState = {
	orders: [],
	order: {},
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
					loading: false
				}
			}
		}
		case GET_ORDER: {
			const {order} = action
			return {
				...state,
				order: {
					...order
				},
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Order Fetch Successfully!'
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
				...state,
				order: {
					...state.order,
					status: 'Cancel'
				},
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Order Cancelled Successfully!'
				}
			}
		}
		case UPDATE_ORDER_STATUS: {
			const {order} = action
			return {
				...state,
				orders: [
					...state.orders,
					[order._id] = {...order}
				],
				status: {
					...state.status,
					isSuccess: true,
					loading: false,
					successMessage: 'Order Status Updated Successfully!'
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

export default order 