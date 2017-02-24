import { get, post } from 'utils'
import * as Api from 'api'

// ------------------------------------
// Constants
// ------------------------------------
export const QUESTION = 'QUESTION'

// ------------------------------------
// Actions
// ------------------------------------
export const queryQuestion = (category, paging_sort) => {
  return (dispatch, getState) => {
    const correct_cb = (data) => {
      console.log('correct_cb', category, data)
      dispatch({
        type: QUESTION,
        data: {
          ...data,
          category
        }
      })
    }
    const failure_cb = (data) => {
      console.log('failure_cb', data)
    }
    let url = Api.queryQuestion('GET', {category: 'test'}, paging_sort)
    get(url, null, correct_cb, failure_cb)
  }
}

export const actions = {
  queryQuestion
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUESTION]    : (state, action) => action.data,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function questionReducer (state = initialState, action) {
  console.log('questionReducer ->', state, action)
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
