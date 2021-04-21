import { call, put, takeEvery} from 'redux-saga/effects'
import {createProduct,getProduct,updateProduct,filterProducts,deleteProduct} from '../../services/product'
import {
	CREATE_PRODUCT,
	CREATE_PRODUCT_REQUESTED,
	UPDATE_PRODUCT,
	UPDATE_PRODUCT_REQUESTED,
	DELETE_PRODUCT_REQUESTED,
	DELETE_PRODUCT,
	GET_PRODUCTS_REQUESTED,
	GET_PRODUCTS,
	GET_PRODUCT_REQUESTED,
	GET_PRODUCT,
	LOADING,
	ERROR
  } from "../types/products";


function* createProductRequested(action) {
	const {product} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(createProduct,product)
		if(res){
			yield put({
				type: CREATE_PRODUCT,
				product: product
			})
		}else{
			yield put({
				type: ERROR,
				status: {
					errorMessage: 'Error Creating Product!'
				}
			})
		}
	}catch(e){
		let errorMessage= 'Error Creating Product!'

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

function* updateProductRequested(action) {
	const {id,product} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(updateProduct,{id,product})
		if(res){
			yield put({
				type: UPDATE_PRODUCT,
				product: product
			})
		}
	}catch(e){
		let errorMessage= 'Error Updating Product!'

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

function* getProductRequested(action) {
	const {id} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(getProduct,id)
		yield put({
			type: GET_PRODUCT,
			product: res.data.data
		})
	}catch(e){
		let errorMessage= 'Ooops...! Something went wrong..!'

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

function* getProductsRequested(action) {
	const {params} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(filterProducts,params)
		yield put({
			type: GET_PRODUCTS,
			products: res.data.data,
			total: res.data.total,
			totalPage: res.data.totalPage,
			currentPage: res.data.currentPage
		})
	}catch(e){
		let errorMessage= 'Ooops...! Something went wrong..!'

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

function* removeProductRequested(action){
	const {id} = action
	try{
		yield put({
			type: LOADING
		})
		yield call(deleteProduct,id)
		yield put({
			type: DELETE_PRODUCT,
			id
		})
	}catch(e){
		let errorMessage= 'Error Deleting Product!'

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

function* productSaga(){
	yield takeEvery(CREATE_PRODUCT_REQUESTED,createProductRequested)
	yield takeEvery(UPDATE_PRODUCT_REQUESTED,updateProductRequested)
	yield takeEvery(GET_PRODUCTS_REQUESTED,getProductsRequested)
	yield takeEvery(DELETE_PRODUCT_REQUESTED,removeProductRequested)
	yield takeEvery(GET_PRODUCT_REQUESTED,getProductRequested)
}

export default productSaga;