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

export const createOrder = (payload) => {
	return new Promise((resolve,reject) => {
		$axios.post(`${API_URL}/orders`,payload).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}
