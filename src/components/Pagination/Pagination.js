import {Pagination} from 'react-bootstrap'

const PaginationBar = ({limit, total_page, current_page, onPaginationChanged}) => {
	let pageList = []
	for (let i = 1; i <= total_page; i++) {
		pageList.push(i)
	}
	return (
		<Pagination className="mt-5">
			<Pagination.First />
			<Pagination.Prev />
			{
				pageList.map(item => (
					<Pagination.Item
						active={item === current_page
							? 'active'
							: ''}
						onClick={onPaginationChanged(item)}
						key={item}>
						{item}
					</Pagination.Item>
				))
			}
			<Pagination.Next />
			<Pagination.Last />
		</Pagination>
	)
}

export default PaginationBar
