import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { motion,AnimatePresence } from "framer-motion"
import { Button,FormCheck,Form,FormGroup,FormLabel,FormControl } from 'react-bootstrap'
import braintree from 'braintree-web'
import axios from 'axios'

import visaImage from '../assets/images/master.png'
import paypalImage from '../assets/images/paypal.png'
import codImage from '../assets/images/COD.png'

const Checkout = () => {

	const cart_items 					= useSelector(state => state.cart ? state.cart : [])

	const [values,setValues] = useState({
		cardholderName: '',
		number: '',
		expMonth: '',
		expYear: '',
		expirationDate: ''
	})

	const [payment_type,setPaymentType] = useState('master/visa')


	const user = JSON.parse(localStorage.getItem('jwt'))
	const user_id = user._id
	const token = user.token
	

	const [clientToken,setClientToken] = useState('')

	const onCheckoutHandler = (e) => {
		e.preventDefault()
		const order = {
			items: cart_items,
			user: user,
			shippingAddress: 'No.5, Block 36A, Shwe Kantharyar Housing, HTYR, YGN.'
		}

		axios.post(`/orders`,order,{
			withCredentials: true,
			baseURL: 'http://localhost:8000/api/v1',
			headers:{
				  'Authorization': `Bearer ${token}`
			  }
		  }).then(res => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})

		// axios.get(`/braintree/getClientToken/${user_id}`,{
		// 	withCredentials: true,
		// 	baseURL: 'http://localhost:8000/api/v1',
		// 	headers:{
		// 		  'Authorization': `Bearer ${token}`
		// 	  }
		//   }).then(res => {
		// 	console.log(res)
		// }).catch(err => {
		// 	console.log(err)
		// })

		// const exp = `${values.expMonth}/${values.expYear}`
		// e.preventDefault()
		// setValues({
		// 	...values,
		// 	expirationDate: exp
		// })
		
	}

	const onValueChanged = (name) => (e) => {
		e.preventDefault()
		setValues({
			...values,
			[name]: e.target.value
		})
	}

	const onPaymentTypeChanged = (payment_type) => (e) => {

		setPaymentType(e.target.value)
	}

	const showMasterVisaForm = () => (
		<AnimatePresence>
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{easings:'easeInOut',duration:0.8}}
		>
			<FormGroup>
				<FormLabel htmlFor="card-holder-name">
					Card Holder Name
				</FormLabel>
				<FormControl name="card-holder-name" id="cc-name" type="text" placeholder="Name" value={values.cardholderName} onChange={onValueChanged('cardholderName')}>	
				</FormControl>
			</FormGroup>
			<FormGroup>
				<FormLabel htmlFor="card-holder-name">
					Card Number
				</FormLabel>
				<FormControl name="card-number" id="cc-number"  type="text" placeholder="xxxx xxxx xxxx xxxx" value={values.number} onChange={onValueChanged('number')}>	
				</FormControl>
			</FormGroup>
			<div className="d-flex flex-row">
				<FormGroup className="mr-3">
					<FormLabel htmlFor="card-holder-name">
						Month
					</FormLabel>
					<FormControl name="expiry-month" id="cc-expiration"  type="text" placeholder="MM" value={values.expMonth} onChange={onValueChanged('expMonth')}>	
					</FormControl>
				</FormGroup>
				<FormGroup className="mr-3">
					<FormLabel htmlFor="card-holder-name">
						Year
					</FormLabel>
					<FormControl name="card-holder-name" type="text" placeholder="YY" value={values.expYear} onChange={onValueChanged('expYear')}>	
					</FormControl>
				</FormGroup>
				<FormGroup>
					<FormLabel htmlFor="card-holder-name">
						CVV
					</FormLabel>
					<FormControl name="card-holder-name" id="cc-cvv"  type="text" placeholder="xxx" value={values.cvv} onChange={onValueChanged('cvv')}>	
					</FormControl>
				</FormGroup>
			</div>
			</motion.div>
		</AnimatePresence>
	)
	const showPaypalForm = () => (
		<AnimatePresence>
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{easings:'easeInOut',duration:0.8}}
		>
			<FormGroup>
				<FormLabel htmlFor="paypal-email">
					Email
				</FormLabel>
				<FormControl name="paypal-email">	
				</FormControl>
			</FormGroup>
			</motion.div>
		</AnimatePresence>
	)
	const showCODForm = () => (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{easings:'easeInOut',duration:0.8}}
			>
			<FormGroup>
				<FormLabel htmlFor="Address">
					Address
				</FormLabel>
				<textarea className="form-control" name="address">	
				</textarea>
			</FormGroup>
			<FormGroup>
				<FormLabel htmlFor="zipcode">
					Zip Code
				</FormLabel>
				<FormControl name="zipcode" placeholder="xxxxx">	
				</FormControl>
			</FormGroup>
			<FormGroup>
				<FormLabel htmlFor="phone">
					Phone
				</FormLabel>
				<FormControl name="phone" placeholder="09 ">	
				</FormControl>
			</FormGroup>
			</motion.div>
		</AnimatePresence>
	)

	const showPaymentForm = () => (
		<Form onSubmit={onCheckoutHandler}>
			<FormGroup>
				<FormLabel htmlFor="card-holder-name">
					Payment Type
				</FormLabel>
				<Form.Group className="d-flex flex-row">
					<FormCheck className="pr-2 d-flex flex-row align-items-center">
						<FormCheck.Input type="radio" name="payment_type" value='master/visa' checked={payment_type === 'master/visa' ? true : false}  onChange={onPaymentTypeChanged('payment_type')}></FormCheck.Input>
						<FormCheck.Label><img style={{height:'60px'}} src={visaImage} alt="Visa"></img> </FormCheck.Label>
					</FormCheck>
					<FormCheck className="pr-2 d-flex flex-row align-items-center">
						<FormCheck.Input type="radio" name="payment_type" value='paypal' checked={payment_type === 'paypal' ? true : false}  onChange={onPaymentTypeChanged('payment_type')}></FormCheck.Input>
						<FormCheck.Label><img style={{height:'60px'}} src={paypalImage} alt="Visa"></img> </FormCheck.Label>
					</FormCheck>
					<FormCheck className="pr-2 d-flex flex-row align-items-center">
						<FormCheck.Input type="radio" name="payment_type" value='cod' checked={payment_type === 'cod' ? true : false}  onChange={onPaymentTypeChanged('payment_type')}></FormCheck.Input>
						<FormCheck.Label><img style={{height:'60px'}} src={codImage} alt="Visa"></img> </FormCheck.Label>
					</FormCheck>
				</Form.Group>
			</FormGroup>
			{
				payment_type === 'master/visa' ?
				showMasterVisaForm() 
				: 
				payment_type === 'paypal' ?
				showPaypalForm() 
				: 
				showCODForm()
			}
			<Button type="submit" className="big-btn btn-white my-4">Checkout</Button>
		</Form>
	)
	return(
		<div>
			{showPaymentForm()}
		</div>
	)
}


export default Checkout



// import React from "react";
// import DropIn from "braintree-web-drop-in-react";
// import axios from 'axios'

// class Checkout extends React.Component {
//   instance;
 
//   state = {
//     clientToken: null,
//   };
 
//   async componentDidMount() {
//     // Get a client token for authorization from your server
// 		const user = JSON.parse(localStorage.getItem('jwt'))
// 		const user_id = user._id
// 		const token = user.token

// 		axios.get(`/braintree/getClientToken/${user_id}`,{
// 			withCredentials: true,
// 			baseURL: 'http://localhost:8000/api/v1',
// 			headers:{
// 				  'Authorization': `Bearer ${token}`
// 			  }
// 		  }).then(res => {
// 			console.log(res)
// 		}).catch(err => {
// 			console.log(err)
// 		})
 
//     this.setState({
//       clientToken: 'adfasdf asdfasdf asdfasdfasdf asfasdfs',
//     });
//   }
 
//   async buy() {
//     // Send the nonce to your server
//     const { nonce } = await this.instance.requestPaymentMethod();
//     await fetch(`server.test/purchase/${nonce}`);
//   }
 
//   render() {
//     if (!this.state.clientToken) {
//       return (
//         <div>
//           <h1>Loading...</h1>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <DropIn
//             options={{ authorization: this.state.clientToken }}
//             onInstance={(instance) => (this.instance = instance)}
//           />
//           <button onClick={this.buy.bind(this)}>Buy</button>
//         </div>
//       );
//     }
//   }
// }

// export default Checkout