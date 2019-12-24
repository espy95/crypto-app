import React, { useState } from 'react'
import aesjs from 'aes-js'
import PropTypes from 'prop-types'
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import LockIcon from '@material-ui/icons/Lock'
import MessageIcon from '@material-ui/icons/Message'
import TabPanel from '../components/TabPanel'
import CBC from './CBCMode'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  icon: {
    color: '#808080',
    opacity: 0.5
  },
  iv: {
    width: 200
  },
  key: {
    width: 300
  },
  message: {
    width: 508
  }
}))

export function encrypt (props) {
  const { iv, key, message } = props
  console.log('TCL: CBC -> iv', iv)
  console.log('TCL: CBC -> key', key)
  console.log('TCL: CBC -> message', message)
  // The initialization vector (must be 16 bytes)
  // const iv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // Convert text to bytes (text must be a multiple of 16 bytes)
  var textBytes = aesjs.utils.utf8.toBytes(message)

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

export default function OFB () {
  const classes = useStyles()
  const [input, setInput] = useState({
    iv: [
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00
    ],
    key: [
      0x41,
      0x73,
      0x73,
      0x69,
      0x67,
      0x6e,
      0x6d,
      0x65,
      0x6e,
      0x74,
      0x20,
      0x31,
      0x20,
      0x4b,
      0x65,
      0x79
    ],
    message: 'testMessage'
  })

  const handleInputChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <Typography variant='h4'>Output Feedback Chaining Mode</Typography>
      </Grid>
      <Grid container spacing={1} justify='center' alignItems='center'>
        <Grid item>
          <TextField
            label='Initialization vector'
            variant='filled'
            disabled
            value={input.iv.join(' ')}
            onChange={handleInputChange}
            className={classes.iv}
          />
        </Grid>
        <Grid item>
          <TextField
            name='key'
            label='Key'
            variant='outlined'
            value={input.key.join(' ')}
            onChange={handleInputChange}
            className={classes.key}
            autoComplete='off'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <VpnKeyIcon className={classes.icon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <TextField
          name='message'
          label='Message'
          variant='outlined'
          value={input.message}
          onChange={handleInputChange}
          className={classes.message}
          multiline
          rows={3}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <MessageIcon className={classes.icon} />
              </InputAdornment>
            )
          }}
        />
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
  )
}
