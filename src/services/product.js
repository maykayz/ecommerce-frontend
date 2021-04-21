import axios from 'axios'
import {API_URL} from '../config'

const token = localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')).token : ''

const $axios = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

export const fetchProducts = (params) => {
	const sortBy = params.sortBy ? params.sortBy : 'createdAt'
	const orderBy = params.orderBy ? params.orderBy :'desc'
	const currentPage = params.currentPage ? params.currentPage :1
	const limit = params.limit ? params.limit : 20 
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/products?sortBy=${sortBy}&orderBy=${orderBy}&page=${currentPage}&limit=${limit}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const filterProducts = (filters) => {
	return new Promise((resolve,reject) => {
		$axios.post(`${API_URL}/products/search`,{
			filters: filters
		},{}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const getProduct = (id) => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/products/${id}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const createProduct = (formData) => {
	return new Promise((resolve,reject) => {
		$axios.post(`${API_URL}/products`,formData,{
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const updateProduct = ({id,product}) => {
	const formData = new FormData()
	Object.keys(product).forEach(item => {
		formData.set(item,product[item])
	})
	return new Promise((resolve,reject) => {
		$axios.put(`${API_URL}/products/${id}`,formData,{
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const fetchProductPhoto = (id) => {
	return new Promise((resolve,reject) => {
		$axios.get(`/products/${id}/photo`,{
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const deleteProduct = (id) => {
	return new Promise((resolve,reject) => {
		$axios.delete(`/products/${id}`,{
			headers:{
				'Authorization': `Bearer ${token}`
			}
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}