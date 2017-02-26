import { get, post } from 'utils'
import * as Api from 'api'

// ------------------------------------
// Fetch
// ------------------------------------
export const queryEmployee = async () => {
  return await get(Api.queryEmployee())
}