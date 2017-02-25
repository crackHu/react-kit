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

const AdvancedSearchForm = {
	formItemLayout: {
		labelCol: {
			span: 5
		},
		wrapperCol: {
			span: 19
		},
	},
	item: [{
		label: '短信用户名称',
		name: 'smsCpName',
		required: true,
		message: '不能为空',
		type: 'input',
		showIn: {
			CREATE: true,
			UPDATE: true,
			QUERY: true
		},
		config: {
			placeholder: '请输入短信用户名称',
		}
	}, {
		label: 'appkey',
		name: 'smsCpAppKey',
		required: true,
		message: '不能为空',
		type: 'input',
		showIn: {
			CREATE: true,
			UPDATE: true,
			QUERY: true
		},
		config: {
			placeholder: '请输入短信用户appkey',
		}
	}, {
		label: 'secret',
		name: 'smsCpSecret',
		type: 'input',
		required: true,
		message: '不能为空',
		showIn: {
			CREATE: true,
			UPDATE: true,
			QUERY: true
		},
		config: {
			placeholder: '请输入短信用户secret',
		}
	}, {
		label: '创建时间',
		name: 'smsCreateTime',
		type: 'datepicker',
		format: 'DATE_FORMAT_STRING',
		required: true,
		message: '不能为空',
		showIn: {
			CREATE: false,
			UPDATE: false,
			QUERY: true
		},
		config: {
			showTime: true,
			style: {
				width: 197.33
			},
			placeholder: '请输入短信用户secret',
		}
	}, {
		label: '修改时间',
		name: 'smsModifyTime',
		type: 'datepicker',
		format: 'DATE_FORMAT_STRING',
		required: true,
		message: '不能为空',
		showIn: {
			CREATE: false,
			UPDATE: false,
			QUERY: true
		},
		config: {
			showTime: true,
			style: {
				width: 197.33
			},
			placeholder: '请输入短信用户secret',
		}
	}, ]
}

module.exports = {
	CrudTable,
	AdvancedSearchForm,
}