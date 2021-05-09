import {
	GET_ORDERS_REQUESTED,
	ADD_ORDER_REQUESTED,
	INIT_STATUS
  } from "../types/orders";

const getOrders = (orders) => {
	return {
		type: GET_ORDERS_REQUESTED,
		orders
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

export {getOrders, addOrder,initStatus}