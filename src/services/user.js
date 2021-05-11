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

export const getUser = (id) => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/users/${id}`).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}

export const updateUser = (payload) => {
	return new Promise((resolve,reject) => {
		$axios.put(`${API_URL}/users/${payload._id}`,payload).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}
