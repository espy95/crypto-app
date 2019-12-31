import React from 'react'
import {
  Button,
  Grid,
  InputAdornment,
  TextField
} from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description'
import LockIcon from '@material-ui/icons/Lock'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { FileDownload } from './FileTransfer'

const inputIcon = {
  message: <DescriptionIcon />,
  certificate: <DescriptionIcon />,
  publicKey: <NoEncryptionIcon color='secondary' />,
  decrypted: <NoEncryptionIcon color='secondary' />,
  privateKey: <LockIcon color='primary' />,
  encrypted: <LockIcon color='primary' />,
  key: <VpnKeyIcon />
}

export default function OutputField ({ name, output, onCopy, ...props }) {
  const outputFile = {
    state: name,
    message: output
  }
  const color = name === 'decrypted' || name === 'publicKey' ? 'secondary' : 'primary'

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
                {inputIcon[name]}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <Button onClick={handleCopy}>
                  {name === 'message' || name === 'decrypted' || name === 'encrypted' ? <SwapVertIcon /> : 'Copy'}
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
