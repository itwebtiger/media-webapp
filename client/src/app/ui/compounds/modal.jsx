import PropTypes from 'prop-types'
import React  from 'react'
import { Portal } from 'react-portal'
import styled, { css } from 'styled-components'

import { CloseIcon } from 'ui/icons'

const Modal = ({
  children,
  onClickOutside,
  onClose,
  open,
  dimmer,
  position,
  height,
  width,
  fullWidth,
  zIndex
}) => {
  if (!open) {
    return null
  }

  return (
    <Portal>
      <Overlay
        dimmer={ dimmer }
        onClick={ onClickOutside }
        zIndex={ zIndex }>
        <ContentModal
          onClick={ (e) => e.stopPropagation() }
          position={ position }
          width={ width }
          height={ height }
          fullWidth={ fullWidth }>
          <CloseIconWrapper onClick={ onClose }>
            <CloseIcon />
          </CloseIconWrapper>
          { children }
        </ContentModal>
      </Overlay>
    </Portal>
  )
}

Modal.propTypes = {
  position: PropTypes.string,
  dimmer: PropTypes.bool,
  open: PropTypes.bool,
  onClickOutside: PropTypes.func,
  onClose: PropTypes.func,
  height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  fullWidth: PropTypes.bool,
  zIndex: PropTypes.number
}

Modal.defaultProps = {
  position: 'center',
  dimmer: true,
  open: false,
  fullWidth: false,
  width: '30%',
  zIndex: 10
}

const ContentModal = styled.div` {
  position: absolute;
  background-color: #fff;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.2);
  padding: 40px 50px;
  margin: 20px auto;
  border-radius: 2px;
  align-self: flex-start;
  height: ${
    ({ fullWidth, height }) => (fullWidth ? '90%' : height ? height : '')
  };
  width: ${
    ({ fullWidth, width }) => (fullWidth ? '90%' : width ? width : '')
  };
  left: ${
    ({ fullWidth }) => (fullWidth ? '50%' : '')
  };
  overflow: hidden;
  ${
    ({ position }) => {
      switch (position) {
        case 'center':
          return css`
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.5s ease;
            align-self: center;
          `
        case 'top':
          return css`
            left: 50%;
            transform: translate(-50%, 10%);
          `
      }
    }
  }
  @media (min-width: 300px) {
    width: 90%;
  }
  @media (min-width: 600px) {
    width: 80%;
  }
  @media (min-width: 800px) {
    width: 75%;
  }
}`

const Overlay = styled.div`
  background-color: ${
    ({ dimmer }) => dimmer ? 'rgba(0,0,0,0.3)' : 'transparent'
  };
  transition: all 0.3s ease;
  width: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transform: scale(1);
  z-index: ${
    ({ zIndex }) => zIndex
  };
`

const CloseIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 15px;
  color: #282c34;
`

export default Modal
