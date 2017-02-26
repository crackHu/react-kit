import { get, post } from 'utils'
import * as Api from 'api'

// ------------------------------------
// Constants
// ------------------------------------
export const QUESTION = 'QUESTION'

// ------------------------------------
// Actions
// ------------------------------------
export const queryQuestion = (category, param, paging_sort) => {
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
  queryQuestion
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUESTION]    : (state, action) => action.data
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
