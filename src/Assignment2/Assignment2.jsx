import React, { useState } from 'react'
import {
  Grid,
  Tabs,
  Tab
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TabPanel from '../components/TabPanel'
import Certification from './Certification'
import Cryption from './Cryption'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

export default function Assignment2 () {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const handleChange = (event, newTab) => {
    setTab(newTab)
  }

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={2}>
        <Tabs
          orientation='vertical'
          indicatorColor='primary'
          value={tab}
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab label='Certification' />
          <Tab label='Encryption & Decryption' />
        </Tabs>
      </Grid>
      <Grid item xs={10}>
        <TabPanel value={tab} index={0}>
          <Certification />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Cryption />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
