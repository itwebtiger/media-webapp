import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import { types } from 'state/ducks/project'

export default {
  component: 'modal/CreateProject',
  reducer: combineReducers({
    idle: createReducer(true)({
      [ types.CREATE ]: () => false,
      [ types.CREATE_COMPLETED ]: () => true,
      [ types.CREATE_FAILED ]: () => true
    }),
    error: createReducer(null)({
      [ types.CREATE_COMPLETED ]: () => null,
      [ types.CREATE_FAILED ]: (state, action) => action.payload.reason
    }),
    result: createReducer(null)({
      [ types.CREATE_COMPLETED ]: (state, action) => action.payload.project,
      [ types.CREATE_FAILED ]: () => null
    })
  })
}
