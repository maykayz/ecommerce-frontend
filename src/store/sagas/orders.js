import { call, put, takeEvery} from 'redux-saga/effects'
import {createOrder} from '../../services/order'
import {
	ADD_ORDER_REQUESTED,
	ADD_ORDER,
	ERROR
} from "../types/orders";
import {
	ADD_ORDER_HISTORY
} from "../types/user"
import {
	CLEAR_CART
} from "../types/cart";

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
		}else{
			// yield put({
			// 	type: ERROR,
			// 	status: {
			// 		errorMessage: 'Error Creating Order!'
			// 	}
			// })
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

function* orderSaga(){
	yield takeEvery(ADD_ORDER_REQUESTED,createOrderRequested)
}
export default orderSaga;