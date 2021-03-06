import React, { Component } from 'react'
import styled from 'styled-components'

import { AssistiveTextLine } from 'ui/typo'

const Container = styled.div`
  position: relative;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
`

const InputArea = styled.textarea.attrs({
  rows: ({ rows = 1 }) => rows
})`
  display: block;
  width: 100%;
  appearance: none;
  background-color: white;
  color: black;
  border: none;
  border-radius: none;
  outline: none;
  line-height: 24px;
  padding: 8px;
  resize: none;
  overflow-wrap: break-word;
  cursor: ${
    ({ disabled, readOnly }) => (disabled || readOnly) ? 'not-allowed' : 'inherit'
  };

  &::placeholder {
    color: ${ ({ theme }) => theme.secondary.limpid.base };
  }

  /*
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);
  }
  */
`

const Wrapper = styled.div`
  position: relative;
`

const Indicator = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${ ({ theme }) => theme.black.base };
`

class TextArea extends Component {
  constructor(...args) {
    super(...args)

    this.autoGrow = this.autoGrow.bind(this)
  }
  componentDidMount() {
    setTimeout(() => {
      this.autoGrow()
    }, 100)

    window.addEventListener('resize', this.autoGrow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.autoGrow)
  }

  autoGrow() {
    if (!this._input) {
      return
    }

    this._input.style.height = 0
    this._input.style.height = `${ this._input.scrollHeight }px`
  }

  render() {
    const {
      invalid,
      valid,
      ...props
    } = this.props

    return (
      <Wrapper>
        <Container>
          <InputArea
            valid={ valid }
            invalid={ invalid }
            { ...props }
            innerRef={ e => this._input = e }
            onInput={ this.autoGrow() }
          />
          <Indicator />
        </Container>
        <AssistiveTextLine
          mostLeft mostRight
          variant="error">
          { invalid }
        </AssistiveTextLine>
      </Wrapper>
    )
  }
}

export default TextArea
