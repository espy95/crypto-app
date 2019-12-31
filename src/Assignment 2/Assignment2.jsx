import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, Tab, Tabs, Typography } from '@material-ui/core'
import TabPanel from '../components/TabPanel'
import Certification from './components/Certification'
import Cryption from './components/Cryption'
import marked from 'marked'
import path from './Task.md'

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
  const [taskDescription, setTaskDescription] = useState('')

  useEffect(() => {
    window
      .fetch(path)
      .then(response => {
        return response.text()
      })
      .then(text => setTaskDescription(marked(text)))
  })

  const [tab, setTab] = useState(2)

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
          <Tab label='Task description' />
          <Tab label='Certification' />
          <Tab label='Encryption & Decryption' />
        </Tabs>
      </Grid>
      <Grid item xs={10}>
        <TabPanel value={tab} index={0}>
          <Typography dangerouslySetInnerHTML={{ __html: taskDescription }} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Certification />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Cryption />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
