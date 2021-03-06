import React from 'react'
import styled from 'styled-components'

import { AddIcon } from 'ui/icons'
import { Button, TextArea, TextBox } from 'ui/elements'
import { ErrorBox, InfoBox, SuccessBox, WarningBox } from 'ui/elements'

const Wrapper = styled.section`
`

const Box = styled.div`
  flex-basis: 50%;
  padding: ${ ({ theme }) => `${ theme.spacing.tiny } 0` };
`

const Sep = styled.span`
  margin-right: ${ ({ theme }) => theme.spacing.small };
  height: 1px;
`

const ElementSection = () => (
  <Wrapper>
    <Box>
      <ErrorBox interactable>Error message here!</ErrorBox>
      <InfoBox>Info message here!</InfoBox>
      <SuccessBox>Success message here!</SuccessBox>
      <WarningBox>Warning message here!</WarningBox>
    </Box>
    <Box>
      <TextBox defaultValue="Normal TextBox" />
      <TextBox defaultValue="Disabled TextBox" disabled />
      <TextBox defaultValue="Readonly TextBox" readOnly />
      <TextBox placeholder="Enter your things here" />
    </Box>
    <Box>
      <TextArea defaultValue="Normal TextArea" />
      <TextArea defaultValue="Disabled TextArea" disabled />
    </Box>
    <Box>
      <Button>
        <AddIcon /><Sep />Click me, a button!
      </Button>
      <Sep />
      <Button plain>
        <AddIcon /><Sep />Plain button!
      </Button>
    </Box>
    <Box>
      <Button.Group>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
      </Button.Group>
    </Box>
  </Wrapper>
)

export default ElementSection
