import {all} from 'redux-saga/effects'
import productSaga from './products'
import brandSaga from './brands'
import categorySaga from './categories'

export default function* rootSaga() {
	yield all([
		productSaga(),
		brandSaga(),
		categorySaga()
	])
}