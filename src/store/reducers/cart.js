import {
	GET_CART,
	ADD_TO_CART,
	UPDATE_QTY,
	REMOVE_FROM_CART,
	CLEAR_CART
  } from "../types/cart";


const initialState = []

const cart = (state = initialState,action) => {
	switch(action.type){
		case GET_CART: {
			const cart = JSON.parse(localStorage.getItem('moony_cart'))
			const cart_items = cart && cart.length > 0 ? cart : []
			return [
				...cart_items
			]
		}
		case ADD_TO_CART: {
			const {item} = action
			let cart_items = []
			if(state.filter(product => product._id === item._id).length > 0){
				cart_items = [
					...state.filter(p => p._id !== item._id),
					...state.filter(p => p._id === item._id ? p.count ++ : '')
				]
			}else{
				item.count = 1
				cart_items = [
					...state,
					item
				]
			}
			localStorage.setItem('moony_cart',JSON.stringify(cart_items))
			return [
				...cart_items
			]
		}
		case UPDATE_QTY: {
			localStorage.setItem('moony_cart',JSON.stringify(state))
			return [
				...state
			]
		}
		case REMOVE_FROM_CART: {
			const {item} = action 
			localStorage.setItem('moony_cart',JSON.stringify([
				...state.filter(product => product._id !== item._id)
			]))
			return [
				...state.filter(product => product._id !== item._id)
			]
		}
		case CLEAR_CART : {
			localStorage.removeItem('moony_cart')
			return [
				...initialState
			]
		}
		default: {
			return [
				...state
			]
		}
	}
}

export default cart 