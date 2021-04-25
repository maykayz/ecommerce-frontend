import {
	GET_CART,
	ADD_TO_CART,
	UPDATE_QTY,
	REMOVE_FROM_CART
  } from "../types/cart";

const getCart = (params) => {
	return {
		type: GET_CART
	}
}
const addToCart = (item) => {
	return {
		type: ADD_TO_CART,
		item
	}
}
const updateQty = (item) => {
	return {
		type: UPDATE_QTY,
		item
	}
}
const removeFromCart = (item) => {
	return {
		type: REMOVE_FROM_CART,
		item
	}
}



export {getCart,addToCart,updateQty,removeFromCart}