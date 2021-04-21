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

export const getBrand = (id) => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/brands/${id}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const fetchBrands = () => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/brands`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const deleteBrand = (_id) => {
	return new Promise((resolve,reject) => {
		$axios.delete(`${API_URL}/brands/${_id}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const createBrand = (values) => {
	const {name} = values
	return new Promise((resolve,reject) => {
		$axios.post(`${API_URL}/brands`,{
			name: name
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}


export const updateBrand = (brand) => {
	const {_id,name} = brand
	return new Promise((resolve,reject) => {
		$axios.put(`${API_URL}/brands/${_id}`,{
			name: name
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}