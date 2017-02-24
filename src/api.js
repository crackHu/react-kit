import { APP, DEFAULT_PAGING_SORT } from 'config'
import { urlEncode } from 'utils'

const {api} = APP

const ApiUrl = (base, type = 'GET', param, methodName = 'API') => {
	let url = api.getUrl(base)
	console.debug(`${methodName}[${type}] => URL: ${url} PARAM: ${JSON.stringify(param)}`)
	return type === 'GET' ? `${url}?${urlEncode(param)}` : { url, param }
}

const initParam = (param = {}, paging_sort = DEFAULT_PAGING_SORT) => {
	let {current, pageSize, sortField, sortOrder} = paging_sort
	paging_sort['page'] = current - 1
	paging_sort['size'] = pageSize
	paging_sort['sort'] = `${sortField},${sortOrder}`

	// delete paging_sort['current']
	// delete paging_sort['pageSize']
	// delete paging_sort['sortField']
	// delete paging_sort['sortOrder']
	Object.assign(param, paging_sort)
	return param
}

export const queryQuestion = (type = 'GET', param, paging_sort) => {
	param = initParam(param, paging_sort)
	return ApiUrl('/admin/rm/getAllQuestionByFirm', type, param, 'queryQuestion')
}