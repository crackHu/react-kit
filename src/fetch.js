import { get, post } from 'utils'
import * as Api from 'api'

// ------------------------------------
// Fetch
// ------------------------------------
export const queryEmployee = async () => {
  return await get(Api.queryEmployee())
}
export const login = async (params) => {
  return await get(Api.login('GET', params))
}