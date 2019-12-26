import React from 'react'
import {
  Button,
  InputAdornment,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockIcon from '@material-ui/icons/Lock'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'

const useStyles = makeStyles(theme => ({
  encryptedIcon: {
    color: theme.palette.primary.main
  },
  decryptedIcon: {
    color: theme.palette.secondary.main
  },
  message: {
    width: 420
  },
  encrypted: {
    borderColor: 'red'
  },
  decrypted: {
    borderColor: 'green'
  }
}))

export default function Output ({ props }) {
  const classes = useStyles()
  const { state, message } = props

  const handleCopy = () => {
    const copyText = document.getElementById('output')
    copyText.select()
    document.execCommand('copy')
  }

  return (
    <TextField
      id='output'
      label={state + ' output'}
      variant='outlined'
      value={message}
      readOnly
      className={classes.message}
      onFocus={handleCopy}
      multiline
      rows={5}
      color={state === 'encrypted' ? 'primary' : 'secondary'}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {state === 'encrypted' ? (
              <LockIcon className={classes.encryptedIcon} />
            ) : (
              <NoEncryptionIcon className={classes.decryptedIcon} />
            )}
          </InputAdornment>
        ),
        endAdornment: (
          <Button onClick={handleCopy}>Copy</Button>
        )
      }}
    />
  )
}
