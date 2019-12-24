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
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import { EncryptedOutput, DecryptedOutput } from '../components/Output'

const useStyles = makeStyles(theme => ({
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

function padded (str) {
  const len = Math.ceil(str.length / 16.0) * 16
  return str.length === len ? str : str.padEnd(len, null)
}

export function encryption (props) {
  const iv = aesjs.utils.hex.toBytes(props.iv)
  const key = aesjs.utils.hex.toBytes(props.key)
  // const key = props.key.match(/.{1,2}/g)
  const message = aesjs.utils.utf8.toBytes(padded(props.message))
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv)

  const encryptedBytes = aesCbc.encrypt(message)

  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)
  return encryptedHex
}

encryption.propTypes = {
  props: PropTypes.object.isRequired
}

export function decryption (props) {
  const iv = aesjs.utils.hex.toBytes(props.iv)
  const key = aesjs.utils.hex.toBytes(props.key)
  const message = props.message
  console.log('TCL: decryption -> props', props)
  const encryptedBytes = aesjs.utils.hex.toBytes(message)
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv)

  const decryptedBytes = aesCbc.decrypt(encryptedBytes)

  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)
  return decryptedText
}

decryption.propTypes = {
  props: PropTypes.object.isRequired
}

export default function CBCMode () {
  const classes = useStyles()
  const [input, setInput] = useState({
    iv: '00000000000000000000000000000000',
    key: '41737369676e6d656e74203120434243',
    message: 'testMessage'
  })
  const [output, setOutput] = useState({
    state: '',
    message: input.message
  })

  const handleInputChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  const encryptInput = () => {
    setOutput({
      state: 'encrypted',
      message: encryption(input)
    })
  }

  const decryptInput = () => {
    setOutput({
      state: 'decrypted',
      message: decryption(input)
    })
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
        <Typography variant='h4'>Cipher-Block Chaining Mode</Typography>
      </Grid>
      <Grid container spacing={1} justify='center' alignItems='center'>
        <Grid item>
          <TextField
            label='Initialization vector'
            variant='filled'
            disabled
            value={input.iv}
            onChange={handleInputChange}
            className={classes.iv}
          />
        </Grid>
        <Grid item>
          <TextField
            name='key'
            label='Key'
            variant='outlined'
            value={input.key}
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
      <Grid container spacing={1} justify='center' alignItems='center'>
        <Grid item>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<LockIcon />}
            onClick={encryptInput}
          >
            Encrypt
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<NoEncryptionIcon />}
            onClick={decryptInput}
          >
            Decrypt
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {output.state === 'encrypted' ? (
          <EncryptedOutput message={output.message} />
        ) : output.state === 'decrypted' ? (
          <DecryptedOutput message={output.message} />
        ) : (
          <Typography>Input Key & Message to Encrypt/Decrypt</Typography>
        )}
      </Grid>
    </Grid>
  )
}
