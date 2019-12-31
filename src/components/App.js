import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './Header'
import Assignment1 from '../Assignment 1/Assignment1'
import Assignment2 from '../Assignment 2/Assignment2'
import { Typography } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

export default function App () {
  return (
    <BrowserRouter>
      <Route
        path='/'
        render={() => <Header />}
      />
      <SnackbarProvider maxSnack={3}>
        <Switch>
          <Route path='/assignment1' component={Assignment1} />
          <Route path='/assignment2' component={Assignment2} />
          <Route exact path='/'>
            <Typography variant='h4' align='center'>Please select the Assignment from the Menu List</Typography>
          </Route>
        </Switch>
      </SnackbarProvider>
    </BrowserRouter>
  )
}
