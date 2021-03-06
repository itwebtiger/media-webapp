import * as CreateProject from 'views/pages/create-project'
import * as Dashboard from 'views/pages/dashboard'
import * as EditProject from 'views/pages/edit-project'
import * as PresetJpeg from 'views/pages/preset-jpeg'
import * as Profile from 'views/pages/profile'
import * as ProjectDetail from 'views/pages/project-detail'
import * as ProjectMedia from 'views/pages/project-detail/project-media'
import * as ProjectList from 'views/pages/project-list'
import * as PullSetting from 'views/pages/pull-setting'
import * as UI from 'views/pages/ui'

import { actions } from 'state/interface'

export default {
  '/': {
    component: Dashboard,
    exact: true,
    onEnter: () => [
      actions.fetchProjects()
    ]
  },
  '/@:id': {
    component: Profile,
    exact: true,
    onEnter: ({ id }) => [
      actions.getAccount(id)
    ]
  },
  '/projects': {
    component: ProjectList,
    exact: true,
    onEnter: () => [
      actions.fetchProjects()
    ]
  },
  '/projects/create': {
    component: CreateProject,
    exact: true
  },
  '/projects/:slug/media': {
    component: ProjectMedia,
    exact: true,
    onEnter: ({ slug }) => [
      actions.fetchProjectMedia(slug)
    ]
  },
  '/projects/:identifier': {
    component: ProjectDetail,
    exact: true,
    onEnter: ({ identifier }) => identifier === 'create' || [
      actions.getProject(identifier)
    ]
  },
  '/projects/:identifier/image_jpeg': {
    component: PresetJpeg,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getPreset({ identifier, contentType: 'image/jpeg' })
    ]
  },
  '/projects/:identifier/edit': {
    component: EditProject,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getProject(identifier)
    ]

  },
  '/projects/:identifier/pull': {
    component: PullSetting,
    exact: true,
    onEnter: ({ identifier }) => [
      actions.getPullSetting(identifier)
    ]
  },
  '/projects/:slug/invite': {
    partial: true,
    onEnter: () => [
      actions.showModal({ modal: 'InviteCollaborator' })
    ]
  },
  '/projects/:slug/invite-by-email': {
    partial: true,
    onEnter: ({ slug }, { email }) => [
      actions.showModal({ modal: 'CollaboratorInviteEmail', params: { slug, email } })
    ]
  },
  '/projects/:slug/cache-invalidator': {
    partial: true,
    onEnter: () => [
      actions.showModal({ modal: 'CacheInvalidatorModal' })
    ]
  },
  '/ui': {
    component: UI,
    exact: true
  }
}
