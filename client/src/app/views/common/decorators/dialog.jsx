import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Portal } from 'react-portal'
import { connect } from 'react-redux'
import styled from 'styled-components'
import keycode from 'keycode'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { stateful } from 'views/common/decorators'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${
    ({ theme }) => theme.black.opaque.base
  };
  padding: ${
    ({ theme }) => `0 ${ theme.spacing.small }`
  };
`

const Wrapper = styled.div`
  background: ${ ({ theme }) => theme.background.base };
  color: ${ ({ theme }) => theme.background.on.base };
  position: relative;
  margin: ${
    ({ theme: { spacing } }) => `
      180px
      auto
      ${spacing.big }
    `
  };
  box-shadow: 0 30px 80px ${
    ({ theme }) => theme.secondary.opaque.base
  };
  min-width: 280px; /* support iphone5s */
  max-width: ${
    ({ width }) => width === 'wide' ?
      '960px' : (
        width === 'narrow' ? '640px' : 'auto'
      )
  };
`

export default ({
  name,
  enableStateful = true
}) => WrappedComponent => {
  const Content = enableStateful ?
    stateful({
      component: `dialog/${ name }`
    })(WrappedComponent) : WrappedComponent

  class Dialog extends Component {
    constructor(...args) {
      super(...args)

      this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
      this.props.hide()

      document.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown(event) {
      const { dialogParams } = this.props

      if (!dialogParams) {
        return
      }

      if (keycode.isEventKey(event, 'esc')) {
        this.props.hide()
      }
    }

    render() {
      const {
        dialogParams,
        width
      } = this.props

      if (!dialogParams) {
        return null
      }

      return (
        <Portal node={ document && document.getElementById('root') }>
          <Overlay>
            <Wrapper onClick={ e => e.stopPropagation() } width={ width }>
              <Content dialogParams={ dialogParams } { ...this.props } />
            </Wrapper>
          </Overlay>
        </Portal>
      )
    }
  }


  Dialog.propTypes = {
    width: PropTypes.oneOf([ 'narrow', 'wide' ])
  }

  return connect(
    state => ({
      dialogParams: selectors.dialog(state, name)
    }),
    mapDispatch({
      hide: () => actions.hideDialog({
        dialog: name
      })
    })
  )(Dialog)
}
