import {
	CREATE_CATEGORY_REQUESTED,
	UPDATE_CATEGORY_REQUESTED,
	DELETE_CATEGORY_REQUESTED,
	GET_CATEGORIES_REQUESTED,
	GET_CATEGORY_REQUESTED,
	INIT_STATUS
  } from "../types/categories";

const getCategories = (categories) => {
	return {
		type: GET_CATEGORIES_REQUESTED,
		categories
	}
}

const getCategory = (id) => {
	console.log('getCategory')
	return {
		type: GET_CATEGORY_REQUESTED,
		id
	}
}
const addCategory = (category) => {
	return {
		type: CREATE_CATEGORY_REQUESTED,
		category
	}
}

const updateCategory = (_id,category) => {
	return {
		type: UPDATE_CATEGORY_REQUESTED,
		_id,
		category
	}
}

const deleteCategory = (_id) => {
	return {
		type: DELETE_CATEGORY_REQUESTED,
		_id
	}
}

const initStatus = (_id) => {
	return {
		type: INIT_STATUS
	}
}

export {getCategories,getCategory,addCategory,updateCategory,deleteCategory,initStatus}