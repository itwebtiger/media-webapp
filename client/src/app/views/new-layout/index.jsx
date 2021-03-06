import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectors } from 'state/interface'

import Body from './body'
import Header from './header'
import Sidebar from './sidebar'

const Surface = styled.main`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 1fr;
  height: 100%;
  position: relative;
  z-index: 0;
`

const LogoInside = styled.div`
  width: 64px;
  height: 64px;
  background: white;
`

const Logo = styled.div.attrs({
  children: () => <LogoInside />
})`
  width: 96px;
  height: 96px;
  margin: 96px auto 16px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Layout = ({ isLayoutClosed, render, ...props }) => (
  <Fragment>
    <Surface>
      { !isLayoutClosed && (
        <Header className="header">
          { render.still(props) }
        </Header>
      ) }
      <Body className="body">
        { isLayoutClosed &&
          <Fragment>
            <Logo />
            { render.overlay(props) }
          </Fragment> ||
          render.content(props)
        }
      </Body>
    </Surface>
    { !isLayoutClosed && <Sidebar /> }
  </Fragment>
)

export default connect(
  state => ({
    isLayoutClosed: selectors.isLayoutClosed(state)
  })
)(Layout)
