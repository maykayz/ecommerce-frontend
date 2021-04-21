import { call, put, takeEvery} from 'redux-saga/effects'
import {createCategory,getCategory,updateCategory,fetchCategories,deleteCategory} from '../../services/category'
import {
	CREATE_CATEGORY,
	CREATE_CATEGORY_REQUESTED,
	UPDATE_CATEGORY,
	UPDATE_CATEGORY_REQUESTED,
	DELETE_CATEGORY_REQUESTED,
	DELETE_CATEGORY,
	GET_CATEGORIES_REQUESTED,
	GET_CATEGORIES,
	GET_CATEGORY_REQUESTED,
	GET_CATEGORY,
	LOADING,
	ERROR
  } from "../types/categories";


function* createCategoryRequested(action) {
	const {category} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(createCategory,category)
		if(res){
			yield put({
				type: CREATE_CATEGORY,
				category: res.data.data
			})
		}else{
			yield put({
				type: ERROR,
				status: {
					errorMessage: 'Error Creating Category!'
				}
			})
		}
	}catch(e){
		let errorMessage= 'Error Creating Category!'

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

function* updateCategoryRequested(action) {
	const {category} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(updateCategory,category)
		if(res){
			yield put({
				type: UPDATE_CATEGORY,
				category: res.data.data
			})
		}
	}catch(e){
		let errorMessage= 'Error Updating Category!'

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

function* getCategoryRequested(action) {
	const {id} = action
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(getCategory,id)
		if(res){
			yield put({
				type: GET_CATEGORY,
				category: res.data.data
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

function* getCategoriesRequested(action) {
	try{
		yield put({
			type: LOADING
		})
		const res = yield call(fetchCategories)
		if(res){
			yield put({
				type: GET_CATEGORIES,
				categories: res.data.data
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

function* removeCategoryRequested(action){
	const {_id} = action
	try{
		yield put({
			type: LOADING
		})
		yield call(deleteCategory,_id)
		yield put({
			type: DELETE_CATEGORY,
			_id
		})
	}catch(e){
		let errorMessage= 'Error Deleting Category!'

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

function* categorySaga(){
	yield takeEvery(CREATE_CATEGORY_REQUESTED,createCategoryRequested)
	yield takeEvery(UPDATE_CATEGORY_REQUESTED,updateCategoryRequested)
	yield takeEvery(GET_CATEGORIES_REQUESTED,getCategoriesRequested)
	yield takeEvery(DELETE_CATEGORY_REQUESTED,removeCategoryRequested)
	yield takeEvery(GET_CATEGORY_REQUESTED,getCategoryRequested)
}

export default categorySaga;