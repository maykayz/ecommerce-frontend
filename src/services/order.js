import axios from 'axios'
import {API_URL} from '../config'

const token = localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')).token : ''

const $axios = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers:{
		'Authorization': `Bearer ${token}`
	}
})

export const getOrders = (filters) => {
	const status = filters.status ? filters.status : ''
	const start_date = filters.start_date ? filters.start_date : ''
	const end_date = filters.end_date ? filters.end_date : ''
	const min = filters.min ? filters.min : ''
	const max = filters.max ? filters.max : ''
	const currentPage = filters.currentPage ? filters.currentPage : 1
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/orders?currentPage=${currentPage}&status=${status}&start_date=${start_date}&end_date=${end_date}&min=${min}&max=${max}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const getOrder = (id) => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/orders/${id}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const cancelOrder = (id) => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/orders/${id}/cancel`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}


// Admin only
export const changeOrderStatus = (payload) => {
	console.log(payload)
	return new Promise((resolve,reject) => {
		$axios.put(`${API_URL}/orders/${payload._id}/status`,{
			status: payload.status
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}



export const createOrder = (payload) => {
	return new Promise((resolve,reject) => {
		$axios.post(`${API_URL}/orders`,payload).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}
