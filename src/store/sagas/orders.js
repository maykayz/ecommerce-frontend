import { call, put, takeEvery} from 'redux-saga/effects'
import {getOrders,createOrder, getOrder,cancelOrder,changeOrderStatus} from '../../services/order'
import {
	GET_ORDERS_REQUESTED,
	GET_ORDERS,
	ADD_ORDER_REQUESTED,
	ADD_ORDER,
	GET_ORDER_REQUESTED,
	GET_ORDER,
	CANCEL_ORDER_REQUESTED,
	CANCEL_ORDER,
	UPDATE_ORDER_STATUS_REQUESTED,
	UPDATE_ORDER_STATUS,
	ERROR
} from "../types/orders";
import {
	ADD_ORDER_HISTORY
} from "../types/user"
import {
	CLEAR_CART
} from "../types/cart";

function* getOrdersRequested(action){
	try{
		const res = yield call(getOrders)
		if(res){
			yield put({
				type: GET_ORDERS,
				orders: res.data.data
			})
		}
	}catch(e){
		let errorMessage= 'Error Creating Order!'

		if(e.response && e.response.data){
			errorMessage = e.response.data.error
		}
		
		yield put({
			type: ERROR,
			status: {
				errorMessage: errorMessage
			}
		})
	}
}

function* createOrderRequested(action){
	const {order} = action
	try{
		const res = yield call(createOrder,order)
		if(res){
			yield put({
				type: ADD_ORDER,
				order: order
			})
			yield put({
				type: ADD_ORDER_HISTORY,
				order: order
			})
			yield put({
				type: CLEAR_CART
			})
		}
	}catch(e){
		let errorMessage= 'Error Creating Order!'

		if(e.response && e.response.data){
			errorMessage = e.response.data.error
		}
		
		yield put({
			type: ERROR,
			status: {
				errorMessage: errorMessage
			}
		})
	}
}

function* getOrderRequested(action){
	const {id} = action
	try{
		const res = yield call(getOrder,id)
		if(res){
			yield put({
				type: GET_ORDER,
				order: res.data.data
			})
		}
	}catch(e){
		let errorMessage= 'Error Fetching Order!'

		if(e.response && e.response.data){
			errorMessage = e.response.data.error
		}
		yield put({
			type: ERROR,
			status: {
				errorMessage: errorMessage
			}
		})
	}
}

function* cancelOrderRequested(action){
	const {id} = action
	try{
		const res = yield call(cancelOrder,id)
		if(res){
			yield put({
				type: CANCEL_ORDER
			})
		}
	}catch(e){
		let errorMessage= 'Error!'

		if(e.response && e.response.data){
			errorMessage = e.response.data.error
		}
		yield put({
			type: ERROR,
			status: {
				errorMessage: errorMessage
			}
		})
	}
}

function* updateOrderStatusRequested(action){
	const{order} = action
	try{
		const res = yield call(changeOrderStatus,order)
		if(res){
			yield put({
				type: UPDATE_ORDER_STATUS,
				order: res.data.data
			})
		}
	}catch(e){
		let errorMessage= 'Error!'

		if(e.response && e.response.data){
			errorMessage = e.response.data.error
		}
		yield put({
			type: ERROR,
			status: {
				errorMessage: errorMessage
			}
		})
	}
}

function* orderSaga(){
	yield takeEvery(GET_ORDERS_REQUESTED,getOrdersRequested)
	yield takeEvery(ADD_ORDER_REQUESTED,createOrderRequested)
	yield takeEvery(GET_ORDER_REQUESTED,getOrderRequested)
	yield takeEvery(CANCEL_ORDER_REQUESTED,cancelOrderRequested)
	yield takeEvery(UPDATE_ORDER_STATUS_REQUESTED,updateOrderStatusRequested)
}
export default orderSaga;