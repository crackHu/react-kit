const CrudTable = {
	columns: [{
		width: 100,
		title: 'id',
		dataIndex: 'id',
		key: 'id',
	}, {
		title: 'status',
		dataIndex: 'status',
		key: 'status',
	}, {
		width: 200,
		title: 'prjName',
		dataIndex: 'prjName',
		key: 'prjName',
	}, {
		width: 200,
		title: 'subject',
		dataIndex: 'subject',
		key: 'subject',
	}, {
		title: 'description',
		dataIndex: 'description',
		key: 'description',
	}, {
		title: 'due_date',
		dataIndex: 'due_date',
		key: 'due_date',
	}, {
		title: 'asign',
		dataIndex: 'asign',
		key: 'asign',
	}, {
		title: 'incha',
		dataIndex: 'incha',
		key: 'incha',
	}, {
		title: 'scheme',
		dataIndex: 'scheme',
		key: 'scheme',
	}, {
		title: 'schemelength',
		dataIndex: 'schemelength',
		key: 'schemelength',
	}]
}

module.exports = {
	CrudTable
}