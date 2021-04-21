import {
	CREATE_PRODUCT_REQUESTED, 
	DELETE_PRODUCT_REQUESTED, 
	GET_PRODUCTS_REQUESTED, 
	GET_PRODUCT_REQUESTED, 
	UPDATE_PRODUCT_REQUESTED,
	INIT_STATUS
} from "../types/products";

const getProducts = (params) => {
	return {
		type: GET_PRODUCTS_REQUESTED,
		params
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

export {getProducts,getProduct,createProduct,updateProduct,deleteProduct,initStatus}