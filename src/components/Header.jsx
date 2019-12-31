import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const pathMap = {
  '/': 'Home',
  '/assignment1': 'Assignment 1, block ciphers and chaining modes',
  '/assignment2': 'Assignment 2, X.509 certificates'
}

export default function Header () {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='sticky' color='primary'>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to='/assignment1'>Assignment1</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to='/assignment2'>Assignment2</MenuItem>
        </Menu>
        <Typography>
          {pathMap[location.pathname]}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
