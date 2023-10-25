import { format } from 'date-fns';
import { ColumnFilter } from './ColumnFilter';
import { Badge } from "react-bootstrap";



export const GROUPED_COLUMNS = [
	{
		Header: 'Id',
		Footer: 'Id',
		accessor: 'id'
	},
	{
		Header: 'Name',
		Footer: 'Name',
		columns: [
			{
				Header: 'First Name',
				Footer: 'First Name',
				accessor: 'first_name'
			},
			{
				Header: 'Last Name',
				Footer: 'Last Name',
				accessor: 'last_name'
			},
		]
	},
	{
		Header: 'Info',
		Footer: 'Info',
		columns: [
			{
				Header: 'Date of  Birth',
				Footer: 'Date of  Birth',
				accessor: 'date_of_birth'
			},
			{
				Header: 'Country',
				Footer: 'Country',
				accessor: 'country',
			},
			{
				Header: 'Phone',
				Footer: 'Phone',
				accessor: 'phone'
			},
		]
	},
]

export const CategoriesList_COLUMNS = [
	{
		Header: 'Name',
		Footer: ' Name',
		accessor: 'Name',
		Filter: ColumnFilter,
	},
	{
		Header: 'Description',
		Footer: 'Description',
		accessor: 'Description',
		Filter: ColumnFilter,
	},
	{
		Header: 'Created by',
		Footer: 'Created by',
		accessor: 'Created by',
		Filter: ColumnFilter,
	},
	{
		Header: 'Created Date',
		Footer: 'Created Date',
		accessor: 'Created Date',
		Filter: ColumnFilter,
	},
	{
		Header: 'Active',
		Footer: 'Active',
		accessor: 'Active',
		Cell: ({ value }) => {
			return <>
				<Badge variant="primary light badge-lg"> {value}</Badge>
			</>
			
        },
		Filter: ColumnFilter,
	}


]

export const SubCategories_COLUMNS = [

	{
		Header: 'Categories Id',
		Footer: ' Categories Id',
		accessor: 'Categories Id',
		Filter: ColumnFilter,
	},
	{
		Header: 'Name',
		Footer: ' Name',
		accessor: 'Name',
		Filter: ColumnFilter,
	},
	{
		Header: 'Description',
		Footer: 'Description',
		accessor: 'Description',
		Filter: ColumnFilter,
	},
	{
		Header: 'Created by',
		Footer: 'Created by',
		accessor: 'Created by',
		Filter: ColumnFilter,
	},
	{
		Header: 'Created Date',
		Footer: 'Created Date',
		accessor: 'Created Date',
		Filter: ColumnFilter,
	},
	,
	{
		Header: 'Active',
		Footer: 'Active',
		accessor: 'Active',
		Cell: ({ value }) => {
			return <>
				<Badge variant="primary light badge-lg"> {value}</Badge>
			</>
			
        },
		Filter: ColumnFilter,
	}

]


