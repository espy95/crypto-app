import React, { useState } from 'react'
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Tabs,
  Tab,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import LockIcon from '@material-ui/icons/Lock'
import MessageIcon from '@material-ui/icons/Message'
import aesjs from 'aes-js'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224
  },
  icon: {
    color: '#808080',
    opacity: 0.5
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-nav-tabpanel-${index}`}
      aria-labelledby={`vertical-nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `vertical-nav-tab-${index}`,
    'aria-controls': `vertical-nav-tabpanel-${index}`
  }
}

export function CBC ({ key, message }) {
  // The initialization vector (must be 16 bytes)
  var iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // Convert text to bytes (text must be a multiple of 16 bytes)
  var text = 'TextMustBe16Byte'
  var textBytes = aesjs.utils.utf8.toBytes(text)

  var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv)
  var encryptedBytes = aesCbc.encrypt(textBytes)

  // To print or store the binary data, you may convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
  console.log(encryptedHex)
  // "104fb073f9a131f2cab49184bb864ca2"

  // When ready to decrypt the hex string, convert it back to bytes
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)

  // The cipher-block chaining mode of operation maintains internal
  // state, so to decrypt a new instance must be instantiated.
  var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv)
  var decryptedBytes = aesCbc.decrypt(encryptedBytes)

  // Convert our bytes back into text
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
  return decryptedText
  // "TextMustBe16Byte"
}

export default function Assignment1 () {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const [input, setInput] = useState({
    key: '',
    message: ''
  })

  const handleInputChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  const handleTabChange = (event, newTab) => {
    setTab(newTab)
  }

  const encrypt = () => {
    console.log('TCL: encrypt -> input', input)
  }

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item xs={1}>
          <Tabs
            orientation='vertical'
            variant='scrollable'
            indicatorColor='primary'
            value={tab}
            onChange={handleTabChange}
            className={classes.tabs}
          >
            <Tab label='CBC' {...a11yProps(0)} />
            <Tab label='CFB' {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid item xs={11}>
          <TabPanel value={tab} index={0}>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
              spacing={2}
            >
              <Grid item>
                <Typography variant='h4'>
          Assignment 1, block ciphers and chaining modes
                </Typography>
              </Grid>
              <Grid container spacing={2} justify='center' alignItems='center'>
                <Grid item>
                  <Typography variant='h6'>Input</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    name='key'
                    label='Key'
                    variant='outlined'
                    value={input.key}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <VpnKeyIcon className={classes.icon} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name='message'
                    label='Message'
                    variant='outlined'
                    value={input.message}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <MessageIcon className={classes.icon} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='secondary'
                  startIcon={<LockIcon />}
                  onClick={encrypt}
                >
          Encrypt
                </Button>
              </Grid>
              <Grid item>
                <Typography>Key: {input.key}</Typography>
              </Grid>
              <Grid item>
                <Typography>Message: {input.message}</Typography>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={1}>
      Item Two
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}
