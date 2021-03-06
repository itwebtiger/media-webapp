import * as types from './types'

export const fetchProjects = () => ({
  type: types.FETCH
})

export const fetchProjectsCompleted = projects => ({
  type: types.FETCH_COMPLETED,
  payload: { projects }
})

export const fetchProjectsFailed = reason => ({
  type: types.FETCH_FAILED,
  payload: { reason }
})

export const createProject = ({ name, description, provider }) => ({
  type: types.CREATE,
  payload: { name, description, provider }
})

export const createProjectCompleted = project => ({
  type: types.CREATE_COMPLETED,
  payload: { project }
})

export const createProjectFailed = reason => ({
  type: types.CREATE_FAILED,
  payload: { reason }
})

export const getProject = identifier => ({
  type: types.GET,
  payload: { identifier }
})

export const getProjectCompleted = project => ({
  type: types.GET_COMPLETED,
  payload: { project }
})

export const getProjectFailed = reason => ({
  type: types.GET_FAILED,
  payload: { reason }
})

export const deleteProject = slug => ({
  type: types.DELETE,
  payload: { slug }
})

export const deleteProjectCompleted = slug => ({
  type: types.DELETE_COMPLETED,
  payload: { slug }
})

export const deleteProjectFailed = reason => ({
  type: types.DELETE_FAILED,
  payload: { reason }
})

export const updateProject = project => ({
  type: types.UPDATE,
  payload: { project }
})

export const updateProjectCompleted = project => ({
  type: types.UPDATE_COMPLETED,
  payload: { project }
})

export const updateProjectFailed = reason => ({
  type: types.UPDATE_FAILED,
  payload: { reason }
})

export const inviteCollaborator = ({ email, messenge }) => ({
  type: types.INVITE_COLLABORATOR,
  payload: { email, messenge }
})

export const inviteCollaboratorCompleted = collaborator => ({
  type: types.INVITE_COLLABORATOR_COMPLETED,
  payload: { collaborator }
})

export const inviteCollaboratorFailed = reason => ({
  type: types.INVITE_COLLABORATOR_FAILED,
  payload: { reason }
})

export const deleteCollaborator = (slug, accountId) => ({
  type: types.DELETE_COLLABORATOR,
  payload: { slug, accountId }
})

//?? what do action do when deleted collaborator?
export const deleteCollaboratorCompleted = (slug, accountId) => ({
  type: types.DELETE_COLLABORATOR_COMPLETED,
  payload: { slug, accountId }
})

export const deleteCollaboratorFailed = reason => ({
  type: types.DELETE_COLLABORATOR_FAILED,
  payload: { reason }
})

export const makeOwner = (accountId, slug) => ({
  type: types.MAKE_OWNER,
  payload: { accountId, slug }
})

export const makeOwnerCompleted = (slug, currentAccountId, accountId) => ({
  type: types.MAKE_OWNER_COMPLETED,
  payload: { slug, currentAccountId, accountId }
})

export const makeOwnerFailed = reason => ({
  type: types.MAKE_OWNER_FAILED,
  payload: { reason }
})

export const invalidateCache = (patterns, slug) => {
  const patternArray = patterns.trim().split(/\s*[,\n+]\s*/).filter(Boolean)

  return ({
    type: types.INVALIDATE_CACHE,
    payload: {
      patterns: patternArray,
      slug
    }
  })
}

export const invalidateCacheCompleted = () => {
  return ({
    type: types.INVALIDATE_CACHE_COMPLETED
  })
}

export const invalidateCacheFailed = reason => ({
  type: types.INVALIDATE_CACHE_FAILED,
  payload: { reason }
})

export const invalidateAllCache = (slug) => {
  return ({
    type: types.INVALIDATE_ALL_CACHE,
    payload: {
      slug
    }
  })
}

export const invalidateAllCacheCompleted = () => {
  return ({
    type: types.INVALIDATE_ALL_CACHE_COMPLETED
  })
}

export const invalidateAllCacheFailed = reason => ({
  type: types.INVALIDATE_ALL_CACHE_FAILED,
  payload: { reason }
})
