import React from 'react'
import { Grid, Typography } from '@material-ui/core'

export default function Cryption () {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <Typography variant='h4'>Encrypt & Decrypt</Typography>
      </Grid>

    </Grid>
  )
}
