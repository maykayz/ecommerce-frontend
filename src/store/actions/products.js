import {
	CREATE_PRODUCT_REQUESTED, 
	DELETE_PRODUCT_REQUESTED, 
	GET_PRODUCTS_REQUESTED, 
	GET_RELATED_PRODUCTS_REQUESTED,
	GET_PRODUCT_REQUESTED, 
	UPDATE_PRODUCT_REQUESTED,
	INIT_STATUS,
	SET_KEYWORD
} from "../types/products";

const getProducts = (params) => {
	return {
		type: GET_PRODUCTS_REQUESTED,
		params
	}
}

const getRelatedProducts = (id) => {
	return {
		type: GET_RELATED_PRODUCTS_REQUESTED,
		id
	}
}

const getProduct = (id) => {
	return {
		type: GET_PRODUCT_REQUESTED,
		id
	}
}
const createProduct = (product) => {
	return {
		type: CREATE_PRODUCT_REQUESTED,
		product
	}
}

const updateProduct = (id,product) => {
	return {
		type: UPDATE_PRODUCT_REQUESTED,
		id,
		product
	}
}

const deleteProduct = (id) => {
	return {
		type: DELETE_PRODUCT_REQUESTED,
		id
	}
}

const initStatus = (id) => {
	return {
		type: INIT_STATUS
	}
}

const setKeyword = (keyword) => {
	return {
		type: SET_KEYWORD,
		keyword: keyword
	}
}

export {getProducts,getRelatedProducts,getProduct,createProduct,updateProduct,deleteProduct,initStatus,setKeyword}