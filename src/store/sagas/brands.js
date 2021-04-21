import { call, put, takeEvery} from 'redux-saga/effects'
import {createBrand,getBrand,updateBrand,fetchBrands,deleteBrand} from '../../services/brand'
import {
	CREATE_BRAND,
	CREATE_BRAND_REQUESTED,
	UPDATE_BRAND,
	UPDATE_BRAND_REQUESTED,
	DELETE_BRAND_REQUESTED,
	DELETE_BRAND,
	GET_BRANDS_REQUESTED,
	GET_BRANDS,
	GET_BRAND_REQUESTED,
	GET_BRAND,
	LOADING,
	ERROR
  } from "../types/brands";


function* createBrandRequested(action) {
	const {brand} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(createBrand,brand)
		if(res){
			yield put({
				type: CREATE_BRAND,
				brand: brand
			})
		}else{
			yield put({
				type: ERROR,
				status: {
					errorMessage: 'Error Creating Brand!'
				}
			})
		}
	}catch(e){
		let errorMessage= 'Error Creating Brand!'

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

function* updateBrandRequested(action) {
	const {brand} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(updateBrand,brand)
		if(res){
			yield put({
				type: UPDATE_BRAND,
				brand: res.data.data
			})
		}
	}catch(e){
		let errorMessage= 'Error Updating Brand!'

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

function* getBrandRequested(action) {
	const {id} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(getBrand,id)
		if(res){
			yield put({
				type: GET_BRAND,
				brand: res.data.data
			})
		}
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

function* getBrandsRequested(action) {
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(fetchBrands)
		if(res){
			yield put({
				type: GET_BRANDS,
				brands: res.data.data
			})
		}
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

function* removeBrandRequested(action){
	const {id} = action
	try{
		yield put({
			type: LOADING
		})
		yield call(deleteBrand,id)
		yield put({
			type: DELETE_BRAND,
			id
		})
	}catch(e){
		let errorMessage= 'Error Deleting Brand!'

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

function* brandSaga(){
	yield takeEvery(CREATE_BRAND_REQUESTED,createBrandRequested)
	yield takeEvery(UPDATE_BRAND_REQUESTED,updateBrandRequested)
	yield takeEvery(GET_BRANDS_REQUESTED,getBrandsRequested)
	yield takeEvery(DELETE_BRAND_REQUESTED,removeBrandRequested)
	yield takeEvery(GET_BRAND_REQUESTED,getBrandRequested)
}

export default brandSaga;