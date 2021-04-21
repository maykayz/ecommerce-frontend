import React from 'react'
import Menu from '../components/Menu/Menu.js'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'

const Layout = ({children,breadcrumbs,className}) => {
	const showBreadcrumb = () => (
		breadcrumbs && 
		<Breadcrumb className="bg-white mt-5 pt-5">
			{
				breadcrumbs.map((item,index) => (
					<BreadcrumbItem href={item.to} key={index} className={index === breadcrumbs.length -1 ? 'active': ''}>{item.title}</BreadcrumbItem>
				))
			}
		</Breadcrumb>
	)
	return(
		<div>
			<Menu></Menu>
			{showBreadcrumb()}
			<div className={className}>
				{children}
			</div>
		</div>
	)
}


export default Layout