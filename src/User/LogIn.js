import React, {useState} from 'react'
import {Link,withRouter,Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {Form,Button,Alert} from 'react-bootstrap'
import {login,authenticate, isAuthenticated} from '../auth/index'

const LogIn = ({history}) => {

	const [values,setValues] = useState({
		email: '',
		password: '',
	})
	const [error,setError] = useState('')
 
	const handleChange = name => e => {
		setValues({
			...values,
			[name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		login(values.email,values.password)
		.then(res => {
			const {token,user} = res.data
			authenticate({token,user},() => {
				history.push('/')
			})
		})
		.catch(err=> {
			setError(err)
		})
	}

	const ErrorAlert = () => (
		<Alert variant="danger" dismissible="true" show={error ? true: false}>{error}</Alert>
	)

	const redirectUser = () => (
		isAuthenticated() ? <Redirect to="/"></Redirect> : ''
		
	)

	const LogInForm = () => (
		<div className="col-12 col-md-6 mx-auto py-5 mt-0 login-container">
			<h1 className="heading">Log In</h1>
			<div className="my-5">
				<Form onSubmit={handleSubmit}>
				{ErrorAlert()}
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" value={values.email} onChange={handleChange('email')}/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword" className="mt-4">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" value={values.password} onChange={handleChange('password')}/>
						<Form.Text className="text-muted">
							<Link to="/forgetpassword" className="text-primary">Forget password?</Link>
						</Form.Text>
					</Form.Group>

					<div className="mt-5">
						<Button type="submit" variant="primary" className="big-btn mr-4">
							Log In
						</Button>
						<Link to="/signup" className="btn btn-outline-primary big-btn">
							Don't have an account?
						</Link>
					</div>
				</Form>
			</div>
		</div>
	)
	
	return(
		<div>
			<Layout className="container py-5 my-5">
				{LogInForm()}
				{redirectUser()}
			</Layout>
		</div>
	)
}


export default withRouter(LogIn)