import React, { useState } from 'react'
import {
  Grid,
  makeStyles,
  Tabs,
  Tab
} from '@material-ui/core'
import TabPanel from '../components/TabPanel'
import CBCMode from './CBCMode'
import CFBMode from './CFBMode'

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

export default function Assignment1 () {
  const classes = useStyles()
  const [tab, setTab] = useState(1)
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
          <Tab label='Cipher-Block (CBC)' />
          <Tab label='Cipher Feedback (CFB)' />
        </Tabs>
      </Grid>
      <Grid item xs={10}>
        <TabPanel value={tab} index={0}>
          <CBCMode />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <CFBMode />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
