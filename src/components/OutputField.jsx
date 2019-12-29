import React from 'react'
import {
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  TextField
} from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description'
import LockIcon from '@material-ui/icons/Lock'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { FileDownload } from './FileTransfer'

const useStyles = makeStyles(theme => ({
  icon: {
    opacity: 0.5
  },
  encryptedIcon: {
    color: theme.palette.primary.main
  },
  decryptedIcon: {
    color: theme.palette.secondary.main
  }
}))

export default function OutputField ({ name, output, onCopy, ...props }) {
  const outputFile = {
    state: name,
    message: output
  }
  const color = name === 'decrypted' || name === 'publicKey' ? 'secondary' : 'primary'
  const classes = useStyles()

  const handleCopy = () => {
    onCopy(output)
  }

  return (
    <Grid container justify='center' alignItems='center' spacing={1}>
      <Grid item>
        <TextField
          {...props}
          id={name + 'Output'}
          label={name}
          variant='outlined'
          value={output}
          readOnly
          onFocus={handleCopy}
          multiline
          color={color}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {name === 'encrypted' || name === 'privateKey' ? (
                  <LockIcon className={classes.encryptedIcon} />
                ) : name === 'decrypted' || name === 'publicKey' ? (
                  <NoEncryptionIcon className={classes.decryptedIcon} />
                ) : (
                  <DescriptionIcon className={classes.icon} />
                )}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <Button onClick={handleCopy}>
                  {name !== 'certificate' && name !== 'publicKey' && name !== 'privateKey' && <SwapVertIcon />}
                  Copy
                </Button>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item>
        <FileDownload file={outputFile} />
      </Grid>
    </Grid>
  )
}
