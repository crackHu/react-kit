import 'whatwg-fetch'
import { get, post } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const QUESTION = 'QUESTION'

// ------------------------------------
// Actions
// ------------------------------------
export const queryQuestion = (category) => {
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
    get('http://localhost:8080/rmMgr/admin/rm/getAllQuestionByFirm?category=' + category, null, correct_cb, failure_cb)
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
const initialState = 0
export default function questionReducer (state = initialState, action) {
  console.log('questionReducer ->', state, action)
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
