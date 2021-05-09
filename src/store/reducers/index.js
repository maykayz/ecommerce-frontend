import {combineReducers} from 'redux'

import { reducer as formReducer } from 'redux-form';

import products from './products'
import categories from './categories'
import brands from './brands'
import cart from './cart'
import orders from './orders'
import user from './user'

const allReducers = combineReducers({
	form: formReducer,
	products,
	brands,
	categories,
	cart,
	orders,
	user
})

export default allReducers