const DATE_PATTERN = 'YYYY-MM-DD HH:mm:ss'
const APP = {
	api: {
		base: 'http://localhost:8080',
		pro: 'rmMgr',
		getUrl: function(path) {
			return `${this.base}/${this.pro}${path}`
		}
	}
}
const DEFAULT_PAGING_SORT = {
	current: 1,
	pageSize: 20,
	sortField: 'id',
	sortOrder: 'asc'
}
const MENU_ROUTE = {
	defaultOpenKey: 'Question',
	defaultSelectedKey: 'company',
	config: [{
		key: 'Question',
		path: 'Question',
		iconType: 'user',
		content: '问题',
		className: 'nav-text',
		children: [{
			key: 'company',
			link: '/question/company',
			iconType: 'user',
			content: '公司问题列表',
			className: 'nav-text',
		}, {
			key: 'employee',
			link: '/question/employee',
			iconType: 'user',
			content: '员工问题列表',
			className: 'nav-text',
		}, {
			key: 'unfinished',
			link: '/question/unfinished',
			iconType: 'user',
			content: '7天内未完成的问题列表',
			className: 'nav-text',
		}]
	}/*, {
		key: 'Counter',
		path: 'Counter',
		link: '/counter',
		iconType: 'user',
		content: 'Counter',
		className: '',
	}*/]
}
module.exports = {
  DATE_PATTERN,
  APP,
  DEFAULT_PAGING_SORT,
  MENU_ROUTE,
}