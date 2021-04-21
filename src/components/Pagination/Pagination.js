const Pagination = ({limit}) => (
	<Pagination>
		<Pagination.First />
			<Pagination.Prev />
			{
				limit.map(item => (<Pagination.Item>{item}</Pagination.Item>))
			}
			<Pagination.Next />
		<Pagination.Last />
	</Pagination>
)

export default Pagination