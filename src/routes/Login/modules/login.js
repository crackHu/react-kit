import { get, post } from 'utils'
import * as Api from 'api'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'

// ------------------------------------
// Actions
// ------------------------------------
export const login = (category, param, paging_sort) => {
  return (dispatch, getState) => {
    let url = Api.queryQuestion('GET', {...param, category}, paging_sort)
    get(url).then(data => {
      dispatch({
        type: QUESTION,
        data: { ...data, category }
      })
    })
  }
}

export const actions = {
  login
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN]    : (state, action) => action.data
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function loginReducer (state = initialState, action) {
  console.log('loginReducer ->', state, action)
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
