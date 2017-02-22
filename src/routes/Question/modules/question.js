import 'whatwg-fetch'
import { get, post } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const QUESTION = 'QUESTION'

// ------------------------------------
// Actions
// ------------------------------------
export const queryQuestion = () => {
  return (dispatch, getState) => {
    /*return fetch('/users.json')
      .then(response => response.json())
      .then(json => {
        console.log('parsed json', json)

        dispatch({
          type: QUESTION,
          data: json
        })

      }).catch(e => {
        console.log('parsing failed', e)
      })*/
      const correct_cb = (data) => {
      }
      const failure_cb = (data) => {
      }
      const data = get('http://localhost:8080/rmMgr/admin/rm/getAllQuestionByFirm', null, correct_cb, failure_cb)
        .then(data => 
          dispatch({
            type: QUESTION,
            data
          })
        )

      console.log('request:', data)
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
