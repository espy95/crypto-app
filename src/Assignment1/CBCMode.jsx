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
  console.log('TCL: encryption -> props', props)
  const { iv, key, message } = props
  const textBytes = aesjs.utils.utf8.toBytes(padded(message))
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv)

  const encryptedBytes = aesCbc.encrypt(textBytes)

  const encryptedText = aesjs.utils.hex.fromBytes(encryptedBytes)
  return encryptedText
}

encryption.propTypes = {
  props: PropTypes.object.isRequired
}

export function decryption (props) {
  const { iv, key, message } = props
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
