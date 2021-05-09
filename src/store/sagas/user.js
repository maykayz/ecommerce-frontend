import { call, put, takeEvery} from 'redux-saga/effects'
import {
	GET_USER_REQUESTED,
	GET_USER,
	ERROR
} from "../types/user";
import {
	getUser
} from "../../services/user";


function* getUserRequested(){
	const user = JSON.parse(localStorage.getItem('jwt'))
	console.log(user)
	try{
		const res = yield call(getUser,user._id)
		if(res){
			yield put({
				type: GET_USER,
				user: res.data.data
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

function* userSaga(){
	yield takeEvery(GET_USER_REQUESTED,getUserRequested)
}
export default userSaga;