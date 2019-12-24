import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  InputAdornment,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockIcon from '@material-ui/icons/Lock'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#808080',
    opacity: 0.5
  },
  message: {
    width: 508
  }
}))

export const handleCopy = () => {
  const copyText = document.getElementById('output')
  copyText.select()
  document.execCommand('copy')
}

export function EncryptedOutput (props) {
  const classes = useStyles()
  const { message } = props
  return (
    <TextField
      id='output'
      label='Encrypted Output'
      variant='outlined'
      value={message}
      readOnly
      className={classes.message}
      onFocus={handleCopy}
      multiline
      rows={3}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <LockIcon className={classes.icon} />
          </InputAdornment>
        ),
        endAdornment: <Button onClick={handleCopy}>Copy</Button>
      }}
    />
  )
}

EncryptedOutput.propTypes = {
  props: PropTypes.string
}

export function DecryptedOutput (props) {
  const classes = useStyles()
  const { message } = props
  return (
    <TextField
      id='output'
      label='Decrypted Output'
      variant='outlined'
      value={message}
      readOnly
      className={classes.message}
      onFocus={handleCopy}
      multiline
      rows={3}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <NoEncryptionIcon className={classes.icon} />
          </InputAdornment>
        ),
        endAdornment: <Button onClick={handleCopy}>Copy</Button>
      }}
    />
  )
}

DecryptedOutput.propTypes = {
  props: PropTypes.string
}
