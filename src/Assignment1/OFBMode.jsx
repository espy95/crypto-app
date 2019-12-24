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
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import Output from '../components/Output'

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#808080',
    opacity: 0.5
  },
  iv: {
    width: 360
  },
  key: {
    width: 360
  },
  message: {
    width: 728
  }
}))

export default function CBCMode () {
  const crypto = require('crypto')
  const algorithm = 'aes-128-cbc'
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

  const encrypt = (props) => {
    const iv = Buffer.from(props.iv, 'hex')
    const key = Buffer.from(props.key, 'hex')
    const message = Buffer.from(props.message, 'utf8')
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(message)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
  }

  const decrypt = (props) => {
    const iv = Buffer.from(props.iv, 'hex')
    const key = Buffer.from(props.key, 'hex')
    const encryptedMessage = Buffer.from(props.message, 'hex')
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(encryptedMessage)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  }

  const handleInputChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  const encryptInput = () => {
    setOutput({
      state: 'encrypted',
      message: encrypt(input)
    })
  }

  const decryptInput = () => {
    setOutput({
      state: 'decrypted',
      message: decrypt(input)
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
        <Typography variant='h4'>Output Feedback Chaining Mode</Typography>
      </Grid>
      <Grid container spacing={1} justify='center' alignItems='center'>
        <Grid item>
          <TextField
            label='Initialization vector'
            variant='outlined'
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
          rows={7}
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
            color='primary'
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
        {output.state !== '' ? (
          <Output props={output} />
        ) : (
          <Typography>Input Key & Message to Encrypt/Decrypt</Typography>
        )}
      </Grid>
    </Grid>
  )
}
