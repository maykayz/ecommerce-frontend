import {useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import { motion } from "framer-motion"

import './SearchBar.scss'
import search from '../../assets/images/search.svg'


const variants = {
	visible: { opacity: 1,y: 0},
	hidden: { opacity: 0,y: '-100%'},
  }
  
const SearchBar = ({history}) => {
	
	const [searchKeyword,setSearchKeyword] = useState('');
	const [isModalShow,setIsModalShow] = useState(false)

	const onInputChange = (e) => {
		setSearchKeyword(e.target.value)
	}

	const onSubmitInput = (e) => {
		e.preventDefault()
		history.push(`/search?keyword=${searchKeyword}`)
		setIsModalShow(false)
	}
	const toggleModal = (value) => (e) => {
		console.log(value)
		e.preventDefault()
		setIsModalShow(value)
	}


	  
	return (
		<div className="search-bar">
				<img style={{width:'20px',transform:'rotate(270deg)',cursor:'pointer'}} src={search} alt="Search Icon" onClick={toggleModal(true)}></img>
			{isModalShow}
			<motion.div 
				initial="hidden"
				animate={isModalShow ? 'visible' : 'hidden'}
				transition={{ease: "easeInOut", duration: 0.3}}
				id="SearchModal"
				variants={variants}
			>
				<div className="search-form">
					<Button variant="outlined-primary p-4" className="close-button" onClick={toggleModal(false)}>X</Button>
					<Form onSubmit={onSubmitInput} >
						<input className="form-control" placeholder="What do you want to search?" onInput={onInputChange}></input>
					</Form>
					<div className="hiddenBtn"></div>
				</div>
			</motion.div>
		</div>
	)
}

export default withRouter(SearchBar);