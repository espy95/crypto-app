import React, { useState } from 'react'
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
import aesjs from 'aes-js'

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'gray',
    opacity: 0.5
  }
}))

export function CBC ({ key }) {
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
  const [input, setInput] = useState({
    key: '',
    message: ''
  })

  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  const encrypt = () => {
    console.log('TCL: encrypt -> input', input)
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
            onChange={handleChange}
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
            onChange={handleChange}
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
  )
}
