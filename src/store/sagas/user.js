import { call, put, takeEvery} from 'redux-saga/effects'
import {
	GET_USER_REQUESTED,
	GET_USER,
	UPDATE_USER_REQUESTED,
	UPDATE_USER,
	ERROR
} from "../types/user";
import {
	getUser,
	updateUser
} from "../../services/user";


function* getUserRequested(){
	const user = JSON.parse(localStorage.getItem('jwt'))
	try{
		const res = yield call(getUser,user._id)
		if(res){
			yield put({
				type: GET_USER,
				user: res.data.data
			})
		}
	}catch(e){
		let errorMessage= 'Error Fetching User!'

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

function* updateUserRequested(action){
	console.log(action)
	const {user} = action
	try{
		const res = yield call(updateUser,user)
		yield put({
			type: UPDATE_USER,
			user: res.data.data
		})
		
	}catch(e){
		let errorMessage= 'Error Updating User!'

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

function* userSaga(){
	yield takeEvery(GET_USER_REQUESTED,getUserRequested)
	yield takeEvery(UPDATE_USER_REQUESTED,updateUserRequested)
}
export default userSaga;