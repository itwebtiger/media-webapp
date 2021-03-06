import React from 'react'
import styled from 'styled-components'

import { AssistiveTextLine } from 'ui/typo'

const Container = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }

  position: relative;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  grid-template-columns:
    ${ ({ hasLeading }) => hasLeading && '40px' }
    1fr
    ${ ({ hasTrailing }) => hasTrailing && '40px' };
`

const Input = styled.input.attrs({
  type: 'text'
})`
  display: block;
  appearance: none;
  background-color: white;
  color: black;
  border: none;
  border-radius: 0;
  outline: none;
  width: auto;
  line-height: 40px;
  height: 40px;
  ${ ({ hasLeading }) => !hasLeading && 'padding-left: 8px;' }
  ${ ({ hasTrailing }) => !hasTrailing && 'padding-right: 8px;' }
  cursor: ${
    ({ disabled, readOnly }) => (disabled || readOnly) ? 'not-allowed' : 'inherit'
  };

  &::placeholder {
    color: ${ ({ theme }) => theme.secondary.limpid.base };
  }
`

const Wrapper = styled.div`
`

const Indicator = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${ ({ theme }) => theme.black.base };
`

const TextBox = ({
  invalid,
  leading,
  trailing,
  ...props
}) => (
  <Wrapper>
    <Container
      hasLeading={ !!leading }
      hasTrailing={ !!trailing }
    >
      { leading && leading() }
      <Input
        hasLeading={ !!leading }
        hasTrailing={ !!trailing }
        { ...props }
      />
      { trailing && trailing() }
      <Indicator />
    </Container>
    <AssistiveTextLine
      mostLeft mostRight
      variant="error">
      { invalid }
    </AssistiveTextLine>
  </Wrapper>
)

export default TextBox
