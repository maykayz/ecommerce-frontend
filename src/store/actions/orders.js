import {
	GET_ORDERS_REQUESTED,
	ADD_ORDER_REQUESTED,
	GET_ORDER_REQUESTED,
	INIT_STATUS,
	CANCEL_ORDER_REQUESTED,
	UPDATE_ORDER_STATUS_REQUESTED
  } from "../types/orders";

const getOrders = (orders) => {
	return {
		type: GET_ORDERS_REQUESTED,
		orders
	}
}

const cancelOrder = (id) => {
	return {
		type: CANCEL_ORDER_REQUESTED,
		id
	}
} 

const updateOrderStatus = (order) => {
	return {
		type: UPDATE_ORDER_STATUS_REQUESTED,
		order
	}
}

const getOrder = (id) => {
	return {
		type: GET_ORDER_REQUESTED,
		id
	}
}

const addOrder = (order) => {
	return {
		type: ADD_ORDER_REQUESTED,
		order
	}
}


const initStatus = (id) => {
	return {
		type: INIT_STATUS
	}
}

export {getOrders, addOrder, getOrder, initStatus, cancelOrder, updateOrderStatus}