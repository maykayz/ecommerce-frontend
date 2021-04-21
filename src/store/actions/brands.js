import {
	CREATE_BRAND_REQUESTED,
	UPDATE_BRAND_REQUESTED,
	DELETE_BRAND_REQUESTED,
	GET_BRANDS_REQUESTED,
	GET_BRAND_REQUESTED,
	INIT_STATUS
  } from "../types/brands";

const getBrands = (brands) => {
	return {
		type: GET_BRANDS_REQUESTED,
		brands
	}
}

const getBrand = (id) => {
	return {
		type: GET_BRAND_REQUESTED,
		id
	}
}
const addBrand = (brand) => {
	return {
		type: CREATE_BRAND_REQUESTED,
		brand
	}
}

const updateBrand = (id,brand) => {
	return {
		type: UPDATE_BRAND_REQUESTED,
		id,
		brand
	}
}

const deleteBrand = (id) => {
	return {
		type: DELETE_BRAND_REQUESTED,
		id:id
	}
}

const initStatus = (id) => {
	return {
		type: INIT_STATUS
	}
}

export {getBrands,getBrand,addBrand,updateBrand,deleteBrand,initStatus}