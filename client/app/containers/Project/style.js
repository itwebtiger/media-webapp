import prefix from 'helpers/vendor-prefix'
import linkStyle from 'components/Link/style'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { columnLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper,
    maxWidth: '900px'
  },
  project: {
    marginLeft: '30px',
    marginRight: '30px',
    marginBottom: '15px',
    minWidth: '300px'
  },
  usage: {
    marginLeft: '30px',
    marginRight: '30px',
    marginBottom: '15px',
    display: 'block',
    minWidth: '300px'
  },
  code: {
    fontFamily: 'monospace',
    fontSize: FONT_SIZE.smallxx,
    background: COLOR.lightGray,
    padding: '15px',
    marginBottom: '5px',
    display: 'block',
    overflow: 'auto'
  },
  desc: {
    marginTop: '5px',
    fontSize: FONT_SIZE.smallx
  },
  other: {
    marginLeft: '30px',
    marginRight: '30px',
    marginBottom: '15px',
    minWidth: '300px',
  },
  toggleDisable: {
    marginRight: '15px',
  },
  delete: {
    ...linkStyle,
    fontSize: FONT_SIZE.smallx,
    display: 'inline-block'
  }
})

export const form = prefix({
  row: {
    display: 'flex',
    marginBottom: '15px',
    flexDirection: 'column'
  },
  label: {
    marginRight: 'auto',
    marginBottom: '5px'
  },
  desc: {
    marginTop: '5px',
    fontSize: FONT_SIZE.smallx
  }
})
