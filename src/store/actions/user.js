import {
	GET_USER_REQUESTED
  } from "../types/user";

const getUser = () => {
	return {
		type: GET_USER_REQUESTED
	}
}

export {getUser}