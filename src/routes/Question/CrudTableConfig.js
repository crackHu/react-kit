const CrudTable = {
	columns: [{
		title: '#',
		dataIndex: 'id',
		key: 'id',
	}, {
		title: '状态',
		dataIndex: 'status',
		key: 'status',
	}, {
		title: '项目',
		dataIndex: 'prjName',
		key: 'prjName',
	}, {
		title: '主题',
		dataIndex: 'subject',
		key: 'subject',
	}, {
		title: '计划完成时间',
		dataIndex: 'due_date',
		key: 'due_date',
	}, {
		title: '负责人',
		dataIndex: 'incha',
		key: 'incha',
	},  {
		title: '指派给',
		dataIndex: 'asign',
		key: 'asign',
	}]
}

module.exports = {
	CrudTable
}