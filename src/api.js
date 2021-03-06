import { APP, DEFAULT_PAGING_SORT } from 'config'
import { urlEncode } from 'utils'

const { api } = APP
const RM_PREFIX = '/admin/rm/'

const ApiUrl = (base, type = 'GET', param, methodName = 'API') => {
	let url = __DEV__ ? api.getUrl(base) : '/rmMgr' + base
	param['token'] = sessionStorage.token
	console.debug(`${methodName}[${type}] => URL: ${url} PARAM: ${JSON.stringify(param)}`)
	return type === 'GET' ? `${url}?${urlEncode(param)}` : { url, param }
}

const initParam = (param = {}, paging_sort = DEFAULT_PAGING_SORT) => {
	console.debug(`initParam => param: ${JSON.stringify(param)} paging_sort: ${JSON.stringify(paging_sort)}`)
	let {page, current, size, pageSize, sort, sortField, sortOrder} = paging_sort
	paging_sort['page'] = page || page === 0 ? page : current - 1
	paging_sort['size'] = size || size === 0 ? size : pageSize
	paging_sort['sort'] = sort || `${sortField} ${sortOrder}`
	console.debug(`initParam => form`, param, paging_sort)
	delete paging_sort['current']
	delete paging_sort['pageSize']
	delete paging_sort['sortField']
	delete paging_sort['sortOrder']
	Object.assign(param, DEFAULT_PAGING_SORT, paging_sort)
	return param
}

export const queryQuestion = (type = 'GET', param, paging_sort) => {
	param = initParam(param, paging_sort)
	let url = 'getAllQuestionByFirm'
	url = param.category == 'employee' ? 'getStaffQuestionByNameAndState' : url
	url = param.category == 'unfinished' ? 'getUnfinishedQuestionByProjectAndDay' : url
	return ApiUrl(RM_PREFIX + url, type, param, 'queryQuestion')
}

export const queryEmployee = (type = 'GET', param, paging_sort) => {
	param = initParam(param, paging_sort)
	const url = 'getStaffList'
	return ApiUrl(RM_PREFIX + url, type, param, 'queryEmployee')
}

export const login = (type = 'GET', param) => {
	const url = '/v2/open/user/realLogin'
	return ApiUrl(url, type, param, 'login')
}