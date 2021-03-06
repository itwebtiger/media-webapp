import { combineReducers } from 'redux'
import arrayToMap from 'state/helpers/array-to-map'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

const collaboratorsToMap = (arr, indexKey) => arr.reduce(
  (dict, element) => ({
    ...dict,
    [ element.account[ indexKey ] ]: element
  }),
  {}
)


export default combineReducers({
  projects: createReducer({})({
    [ types.FETCH_COMPLETED ]: (state, action) => {
      return action.payload.projects.reduce(
        (projects, project) => ({
          ...projects,
          [ project.identifier ]: {
            ...project,
            collaborators: arrayToMap(project.collaborators, '_id'),
            presets: arrayToMap(project.presets, 'hash'),
          }
        }), {}
      )
    },
    [ types.CREATE_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.identifier ]: {
        ...action.payload.project,
        presets: arrayToMap(action.payload.project.presets, 'hash')
      }
    }),
    [ types.DELETE_COMPLETED ]: (state, action) => {
      const { identifier } = action.payload
      const { [ identifier ]: removedProject, ...projects } = state

      return projects
    },
    [ types.GET_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.identifier ]: {
        ...action.payload.project,
        presets: arrayToMap(action.payload.project.presets, 'hash'),
        collaborators: collaboratorsToMap(action.payload.project.collaborators, '_id')
      }
    }),
    [types.UPDATE_COMPLETED ]: (state, action) => ({
      ...state,
      [ action.payload.project.identifier ]: {
        ...action.payload.project,
        presets: arrayToMap(action.payload.project.presets, 'hash'),
        collaborators: collaboratorsToMap(action.payload.project.collaborators, '_id')
      }
    }),
    [ types.INVITE_COLLABORATOR_COMPLETED ]: (state, action) => {
      const { identifier }  = action.payload.collaborator
      const { collaborator } = action.payload
      const project = state[ identifier ]

      return {
        ...state,
        [ identifier ]: {
          ...project,
          collaborators: {
            ...state[ identifier ].collaborators,
            [ collaborator.account._id ]: collaborator
          }
        }
      }
    },

    [ types.DELETE_COLLABORATOR_COMPLETED ]: (state, action) => {

      const { identifier } = action.payload
      const project = state[ identifier ]
      const { collaborators } = project
      const { accountId } = action.payload
      const { [ accountId ]: accountIdtoDelete, ...newCollaborators } = collaborators

      return {
        ...state,
        [ identifier ]: {
          ...project,
          collaborators: newCollaborators
        }
      }
    },
    [ types.MAKE_OWNER_COMPLETED ]: (state, action) => {
      const { identifier }  = action.payload
      const { currentAccountId } = action.payload
      const { accountId } = action.payload
      const project = state[ identifier ]

      return {
        ...state,
        [ identifier ]: {
          ...project,
          collaborators: {
            ...state[ identifier ].collaborators,
            [ currentAccountId ]: {
              ...state[ identifier ].collaborators[ currentAccountId ], privilege: 'admin',
            },
            [ accountId ]: {
              ...state[ identifier ].collaborators[ accountId ], privilege: 'owner'
            }
          }
        },
      }
    },
    [ types.ADD_CUSTOM_HEADER ]: (state, action) => {
      const { identifier } = action.payload
      const project = state[ identifier ]

      return {
        ...state,
        [ identifier ]: {
          ...project,
          headers: [
            ...(project.headers || []),
            {
              name: '',
              value: ''
            }
          ]
        }
      }
    }
  }),
})
