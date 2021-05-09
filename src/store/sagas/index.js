import {all} from 'redux-saga/effects'
import productSaga from './products'
import brandSaga from './brands'
import categorySaga from './categories'
import orderSaga from './orders'
import userSaga from './user'

export default function* rootSaga() {
	yield all([
		productSaga(),
		brandSaga(),
		categorySaga(),
		orderSaga(),
		userSaga()
	])
}