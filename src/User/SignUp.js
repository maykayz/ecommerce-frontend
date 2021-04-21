
import React, {useState} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import Layout from '../core/Layout'
import {signUp} from '../auth/index'

const SignUp = () => {

	const [values,setValues] = useState({
		name: '',
		email:'',
		password: '',
		confirmPassword: '',
		passwordError: '',
		checked: false,
	})
	const [error,setError] = useState('')
	const [success,setSuccess] = useState(false)

	const onHandleChange = name => e => {
		setValues({
			...values,
			[name]:name === 'checked' ? e.target.checked : e.target.value
		})
		setError('')
		console.log(values.checked)
	}

	const onHandleSubmit = (e) => {
		e.preventDefault();
		setError('')
		const {name,email,password,confirmPassword,checked} = values
		
		if(!name || !email || !password){
			setError('Please Fill Required Information.')
		}else if(password !== confirmPassword){
			setError('Passwords do not match.')
		}
		else if(!checked){
			setError('You must agree Terms & Conditions to continue.')
		}
		else{
			signUp({name,email,password})
			.then(res => setSuccess(true))
			.catch(err => setError(err))
		}
	}

	const SignUpForm = () => (
		<div className="col-12 col-md-6 mx-auto py-5 mt-0 login-container">
			<h1 className="heading">Create Account</h1>
			<div className="mt-5">
				<Form>
					<Alert variant="danger" dismissible="true" show={error ? true: false}>{error}</Alert>
					<Alert variant="success" dismissible="true" show={success ? true: false}>User Sign Up Successful. Please <Link  to="/login">Log In.</Link></Alert>
					<Form.Group controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control value={values.name} type="text" onChange={onHandleChange('name')}/>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" onChange={onHandleChange('email')}/>
						<Form.Text className="text-muted">
						We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword" className="mt-4">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" onChange={onHandleChange('password')}/>
					</Form.Group>

					<Form.Group controlId="formConfirmPassword" className="mt-4">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control type="password" onBlur={onHandleChange('confirmPassword')}/>
						<Form.Text className={`text-danger`}>
							{values.passwordError}
						</Form.Text>
					</Form.Group>
					
					<Form.Group controlId="formBasicCheckbox" className="mt-4">
						<Form.Check type="checkbox" label="I have read and agree to terms & conditions" checked={values.checked}  onChange={onHandleChange('checked')}/>
					</Form.Group>

					<div className="mt-5">
						<Button type="submit" className="btn-primary big-btn mr-4" onClick={onHandleSubmit}>
							Create Account
						</Button>
						<Link to="/login" className="btn btn-outline-primary big-btn">
							Already have an account?
						</Link>
					</div>
				</Form>
			</div>
		</div>
	)

	return(
		<div>
			<Layout sclassName="container py-5 my-5">
				{SignUpForm()}
			</Layout>
		</div>
	)
}


export default SignUp