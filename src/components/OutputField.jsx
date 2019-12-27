import React from 'react'
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockIcon from '@material-ui/icons/Lock'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { FileDownload } from './FileTransfer'

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

export default function OutputField ({ output, onCopy }) {
  const classes = useStyles()
  const { state, message } = output

  const handleCopy = () => {
    onCopy('message', message)
  }

  return (
    <Grid container justify='center' alignItems='center' spacing={1}>
      <Grid item>
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
              <InputAdornment position='end'>
                <Button onClick={handleCopy}>
                  <SwapVertIcon />
                  Copy
                </Button>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item>
        <FileDownload file={output} />
      </Grid>
    </Grid>
  )
}
