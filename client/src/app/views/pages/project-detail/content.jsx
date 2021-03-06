import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { reduxForm, reset } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Layout, Panel, TitleBar } from 'ui/compounds'
import { Button, Container, ErrorBox, Paragraph } from 'ui/elements'
import { AddIcon, OwnerAddIcon, ReloadIcon } from 'ui/icons'
import { stateful } from 'views/common/decorators'
import { Redirect, Route, Switch, withParams } from 'views/router'

import ProjectTools from './project-tools'
import CacheInvalidatorModal from './cache-invalidator-modal'
import CollaboratorInviteEmail from './sent-email-invite-modal'
import CollaboratorList from './collaborator-list'
import _ProjectForm from './form'
import InviteModal from './invite-modal'
import PresetList from './preset-list'
import PresetModal from './preset-modal'
import { ConfirmDeleteCollaboratorDialog, ConfirmDeleteProjectDialog } from './dialog'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const Project = ({
  project,
  hideDeleteCollaboratorDialog,
  showDeleteCollaboratorDialog,
  hideDeleteProjectDialog,
  showDeleteProjectDialog,
  currentAccount,
  deleteProject,
  updateProject,
  toCacheInvalidator,
  toInviteModal,
  toPresetDetail,
  toProfile,
  toProjectDetail,
  toProjectMedia,
  makeOwner,
  deleteCollaborator,
  reset,
  ui: {
    idle, notFound,
    deleteError, deleteResult,
    updateError
  }
}) => {
  if (notFound || deleteResult) {
    return <Redirect to="/projects" />
  }

  return (
    <Fragment>
      <Layout>
        <Layout.Fluid size="small">
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Project Info</h2>
                  </TitleBar.Title>
                  <TitleBar.Menu>
                    <Button plain onClick={ () => reset('project') }>
                      <ReloadIcon size="medium" />
                    </Button>
                  </TitleBar.Menu>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                <Container>
                  { updateError &&
                    <ErrorBox>An error happens when updating the project.</ErrorBox>
                  }
                  { deleteError &&
                    <ErrorBox>An error happens when deleting the project.</ErrorBox>
                  }
                  <ProjectForm
                    showDeleteProjectDialog={ showDeleteProjectDialog }
                    idle={ idle }
                    initialValues={ project }
                    onSubmit={ updateProject }
                  />
                  <ConfirmDeleteProjectDialog
                    width="narrow"
                    content={ () => <Paragraph>Do you want delete this project?</Paragraph> }
                    choices={ () => (
                      <Button.Group>
                        <Button
                          variant="primary"
                          onClick={ () => deleteProject(project.slug) }>
                          Delete
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={ hideDeleteProjectDialog }>
                          Cancel
                        </Button>
                      </Button.Group>
                    ) }
                  />
                </Container>
              </Panel.Content>
            </Panel>
          </Container>
        </Layout.Fluid>
        <Layout.Fixed size="small">
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Presets</h2>
                  </TitleBar.Title>

                  <TitleBar.Menu>
                    <Button plain onClick={ () => toPresetDetail(project.slug, 'new') }>
                      <AddIcon size="medium" />
                    </Button>
                  </TitleBar.Menu>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                { project &&
                  <PresetList
                    presets={ project.presets }
                    onPresetSelected={ hash => {
                      toPresetDetail(project.slug, hash)
                    } }
                  />
                }
              </Panel.Content>
            </Panel>
          </Container>
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Collaborators</h2>
                  </TitleBar.Title>
                  <TitleBar.Menu>
                    <Button plain onClick={ () => toInviteModal(project.slug) }>
                      <OwnerAddIcon size="medium" />
                    </Button>
                  </TitleBar.Menu>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                {
                  project &&
                    <CollaboratorList
                      collaborators={ project.collaborators }
                      toProfile={ toProfile }
                      currentAccount={ currentAccount }
                      makeOwner={ (accountId) => { makeOwner(accountId, project.slug) } }
                      showDeleteCollaboratorDialog={ showDeleteCollaboratorDialog }
                    />
                }
              </Panel.Content>
            </Panel>
            <ConfirmDeleteCollaboratorDialog
              width="narrow"
              content={ ({ params }) => (
                <Paragraph>
                  Do you want to remove the account { params.accountEmail } from the project?
                </Paragraph>
              ) }
              choices={ ({ params }) => (
                <Button.Group>
                  <Button
                    variant="primary"
                    onClick={ () => deleteCollaborator(project.slug, params.accountId) }>
                    Remove
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={ hideDeleteCollaboratorDialog }>
                    Cancel
                  </Button>
                </Button.Group>
              ) }
            />
          </Container>
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Tools</h2>
                  </TitleBar.Title>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                {
                  project &&
                    <ProjectTools
                      detail="Cache Invalidator"
                      slug={ project.slug }
                      toProjectMedia={ () => toProjectMedia(project.slug) }
                      toCacheInvalidator={ () => toCacheInvalidator(project.slug) }
                    />
                }
              </Panel.Content>
            </Panel>
          </Container>
        </Layout.Fixed>
      </Layout>
      <Switch>
        <Route path="/projects/:slug/presets/new">
          <PresetModal
            width="wide"
            hideOnClickOutside={ false }
            title="Create new preset"
            onHide={ () => toProjectDetail(project.slug) }
          />
        </Route>
        <Route path="/projects/:slug/presets/:hash">
          <PresetModal
            width="wide"
            hideOnClickOutside={ false }
            title="Edit preset"
            onHide={ () => toProjectDetail(project.slug) }
          />
        </Route>
      </Switch>
      <Route path="/projects/:slug/invite">
        <InviteModal
          width="wide"
          slug={ project && project.slug }
          title="Invite collaborators"
          onHide={ () => toProjectDetail(project.slug) }
          collaborators={ project && Object.values(project.collaborators) }
        />
      </Route>
      <Route path="/projects/:slug/cache-invalidator">
        <CacheInvalidatorModal
          width="wide"
          onHide={ () => toProjectDetail(project.slug) }
          slug={ project && project.slug }
          title="Cache Invalidator"
        />
      </Route>
      <Route path="/projects/:slug/invite-by-email">
        <CollaboratorInviteEmail
          width="wide"
          title="Sent email invite collaborators"
          onHide={ () => toProjectDetail(project.slug) }
        />
      </Route>
    </Fragment>
  )
}

export default withParams(
  stateful({
    component: 'ProjectDetail'
  })(
    connect(
      (state, { params: { identifier } }) => ({
        project: selectors.findProjectByIdentifier(state, identifier),
        currentAccount: selectors.currentAccount(state)
      }),
      mapDispatch({
        showDeleteCollaboratorDialog: (accountId, accountEmail) => actions.showDialog({ dialog: 'ConfirmDeleteCollaboratorDialog', params: { accountId, accountEmail } }),
        hideDeleteCollaboratorDialog: () => actions.hideDialog({ dialog: 'ConfirmDeleteCollaboratorDialog' }),
        showDeleteProjectDialog: () => actions.showDialog({ dialog: 'ConfirmDeleteProjectDialog' }),
        hideDeleteProjectDialog: () => actions.hideDialog({ dialog: 'ConfirmDeleteProjectDialog' }),
        deleteProject: actions.deleteProject,
        updateProject: actions.updateProject,
        toCacheInvalidator: slug => actions.requestLocation(`/projects/${ slug }/cache-invalidator`),
        toInviteModal: slug => actions.requestLocation(`/projects/${ slug }/invite`),
        toPresetDetail: (slug, hash) => actions.requestLocation(`/projects/${ slug }/presets/${ hash }`),
        toProfile: id => actions.requestLocation(`/@${ id }`),
        toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`),
        toProjectMedia: slug => actions.requestLocation(`/projects/${ slug }/media`),
        makeOwner: actions.makeOwner,
        deleteCollaborator: actions.deleteCollaborator,
        reset
      })
    )(Project)
  )
)
