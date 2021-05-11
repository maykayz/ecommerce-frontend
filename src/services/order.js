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

export const getOrders = () => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/orders`).then(res => {
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
