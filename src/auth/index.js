
import axios from 'axios'
import {API_URL} from '../config'

const $axios = axios.create({
  withCredentials: true,
  baseURL: API_URL
})



export const signUp = (user) => {
	return new Promise((resolve,reject) => {
		$axios.post(`${API_URL}/signup`,user).then(res => {
			resolve(resolve)
		}).catch(error => {
			reject(error.response.data.error)
		})
	})
	
}

export const login = (email,password) => {
	return new Promise((resolve,reject) => {
		$axios.post(`${API_URL}/login`,{
			email: email,
			password: password
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error.response.data.error)
		})
	})
}

export const authenticate = ({token,user},next) => {
	if(typeof(window) != undefined){
		const saveUser = {
			...user,
			token
		}
		localStorage.setItem('jwt',JSON.stringify(saveUser))
		next()
	}
}

export const isAuthenticated = () => {
	if (typeof window == 'undefined') {
        return false;
    } else {
        if (JSON.parse(localStorage.getItem('jwt'))) {
            return JSON.parse(localStorage.getItem('jwt'))
        } else {
            return false;
        }
    }
}

export const isAdmin = () => {
	if (typeof window == 'undefined') {
        return false;
    } else {
		const user = JSON.parse(localStorage.getItem('jwt'))
        if (user && user.role === 0) {
            return user;
        } else {
            return false;
        }
    }
}

export const logout = (next) => {
	if(typeof(window) != undefined){
		localStorage.removeItem('jwt')
		localStorage.removeItem('name')
		localStorage.removeItem('role')
		$axios.get(`${API_URL}/logout`).then(res => {
			next()
		}).catch(error => {
			next()
		})
	}
}

export const getUser = () => {
	const name = localStorage.getItem('name')
	const role = localStorage.getItem('role') === 1 ? 'User' : 'Admin'
	return {
		name,
		role
	}
}

export const getUsers = () => {
	return new Promise((resolve,reject) => {
		$axios.get(`${API_URL}/brands`).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}