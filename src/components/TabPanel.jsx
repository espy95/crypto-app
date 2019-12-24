import React from 'react'
import { Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

export default function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography component='div' hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}
