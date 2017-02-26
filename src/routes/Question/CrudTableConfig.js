const DATE_PATTERN = 'YYYY-MM-DD HH:mm:ss'

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
			span: 6
		},
		wrapperCol: {
			span: 18
		},
	},
	item: [{
		label: '员工姓名',
		name: 'name',
		type: 'select',
		options: JSON.parse(sessionStorage.employee),
		config: {
			placeholder: '请选择员工姓名',
		}
	}, {
		label: '短信用户名称',
		name: 'smsCpName',
		required: true,
		message: '不能为空',
		type: 'input',
		hidden: true,
		config: {
			placeholder: '请输入短信用户名称',
		}
	}, {
		label: 'appkey',
		name: 'smsCpAppKey',
		required: true,
		message: '不能为空',
		type: 'select',
		hidden: true,
		options: [{
			value: '111',
		}, {
			value: '222'
		}],
		config: {
			placeholder: '请输入短信用户appkey',
		}
	}, {
		label: 'secret',
		name: 'smsCpSecret',
		type: 'input',
		required: true,
		message: '不能为空',
		hidden: true,
		config: {
			placeholder: '请输入短信用户secret',
		}
	}, {
		label: '创建时间',
		name: 'smsCreateTime',
		type: 'datepicker',
		format: DATE_PATTERN,
		required: true,
		message: '不能为空',
		hidden: true,
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
		format: DATE_PATTERN,
		required: true,
		message: '不能为空',
		hidden: true,
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