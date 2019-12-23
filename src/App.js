import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Assignment1 from './Assignment1'
import Assignment2 from './Assignment2'

const pathMap = {
  '/': 'Home',
  '/assignment1': 'Assignment 1, block ciphers and chaining modes',
  '/assignment2': 'Assignment 2, X.509 certificates'
}

export default function App () {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <BrowserRouter>
      <Route
        path='/'
        render={({ location }) => (
          <AppBar position='static' color='primary'>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                aria-controls='menu'
                aria-haspopup='true'
                aria-label='menu'
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
                {pathMap[window.location.pathname]}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
      />
      <Switch>
        <Route path='/assignment1'>
          <Assignment1 />
        </Route>
        <Route path='/assignment2'>
          <Assignment2 />
        </Route>
        <Route path='/'>
          <Typography variant='h4' align='center'>Please select the Assignment from the Menu List</Typography>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
