import styled, { css } from 'styled-components'

const Container = styled.div`
  padding: ${ ({ theme }) => theme.spacing.medium };
  ${
    ({ center }) => center && css`
      margin-left: auto;
      margin-right: auto;
    `
  }
  max-width: ${
    ({ size = 'auto' }) => {
      switch (size) {
        case 'large':
          return '1150px'
        case 'small':
          return '360px'
      }

      return 'none'
    }
  };
`

export default Container
