import styled from 'styled-components'

const Header = styled.p`
  text-align: ${
    ({ center }) => center && 'center'
   };
  padding-bottom: 20px;
  font-weight: bold;
`
export default Header
