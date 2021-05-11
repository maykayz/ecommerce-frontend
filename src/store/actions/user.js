import {
	GET_USER_REQUESTED,
	UPDATE_USER_REQUESTED
  } from "../types/user";

const getUser = () => {
	return {
		type: GET_USER_REQUESTED
	}
}

const updateUser = (user) => {
	return {
		type: UPDATE_USER_REQUESTED,
		user: user
	}
}

export {getUser,updateUser}