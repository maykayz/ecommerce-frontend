import {useState} from 'react'
import {Form} from 'react-bootstrap'
import './SearchBar.scss'
import search from '../../assets/images/search.svg'

const SearchBar = () => {
	
	const [keyword,setKeyword] = useState('');

	const onInputChange = (e) => {
		setKeyword(e.target.value)
	}

	const onSubmitInput = (e) => {
		e.preventDefault()
		console.log(keyword)
	}

	return (
		<div className="search-bar">
			<Form onSubmit={onSubmitInput}>
				<input placeholder="What do you want to search?" onInput={onInputChange}></input>
			</Form>
			<img style={{width:'20px',transform:'rotate(270deg)'}} src={search} alt="Search Icon"></img>
		</div>
	)
}

export default SearchBar;