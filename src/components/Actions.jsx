import React from 'react'
import { Button, Grid } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'

export default function Actions ({ onEncryption, onDecryption }) {
  const handleEncryption = () => {
    onEncryption()
  }
  const handleDecryption = () => {
    onDecryption()
  }

  return (
    <Grid container spacing={2} justify='center' alignItems='center'>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          startIcon={<LockIcon />}
          onClick={handleEncryption}
        >
          Encrypt
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          color='secondary'
          startIcon={<NoEncryptionIcon />}
          onClick={handleDecryption}
        >
          Decrypt
        </Button>
      </Grid>
    </Grid>
  )
}
