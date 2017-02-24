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
	pageSize: 10,
	sortField: 'id',
	sortOrder: 'asc'
}

module.exports = {
  DATE_PATTERN,
  APP,
  DEFAULT_PAGING_SORT
}