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
export const fetchCategories = () => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/categories`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const getCategory = (_id) => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/categories/${_id}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const deleteCategory = (_id) => {
	return new Promise((resolve,reject) => {
		$axios.delete(`${API_URL}/categories/${_id}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const createCategory = (values) => {
	const {name} = values
	return new Promise((resolve,reject) => {
		$axios.post(`${API_URL}/categories`,{
			name: name
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}



export const updateCategory = (category) => {
	const {_id,name} = category
	return new Promise((resolve,reject) => {
		$axios.put(`${API_URL}/categories/${_id}`,{
			name: name
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}