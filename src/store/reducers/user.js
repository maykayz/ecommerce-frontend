import {
	GET_USER,
	UPDATE_USER,
	GET_ORDER_HISTORY,
	ADD_ORDER_HISTORY,
	ERROR,
	SUCCESS
} from '../types/user'


const initialState = {
	user: {
		status: {
			isSuccess: false,
			isError: false,
			loading:false,
			successMessage: '',
			errorMessage: ''
		}
	}
}

const  user = (state = initialState,action) => {
	switch(action.type){
		case GET_USER: {
			const {user} = action
			return {
				...user
			}
		}
		case UPDATE_USER: {
			const {user} = action
			return {
				...user,
				status: {
					isSuccess: true,
					isError: false,
					loading:false,
					successMessage: 'User Updated Successfully.',
					errorMessage: ''
				}
			}
		}
		case GET_ORDER_HISTORY: {
			const {orders} = action
			return {
				...state,
				history: [
					...orders
				]
			}
		}
		case ADD_ORDER_HISTORY: {
			const {order} = action
			return {
				...state,
				history: [
					...state.history,
					order
				]
			}
		}
		default: {
			return {
				...state
			}
		}
	}
}

export default user