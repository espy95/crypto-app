import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { getCertPems } from '../../reducers/reducers'
import Create from './Create'
import Verify from './Verify'
import Panel from './Panel'

export default function Certification () {
  const [expanded, setExpanded] = useState('')
  const pems = useSelector(getCertPems)
  const [values, setValues] = useState(pems)

  useEffect(() => {
    setValues(pems)
  }, [pems])

  const handleChange = panel => {
    setExpanded(expanded === panel ? '' : panel)
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
        <Typography variant='h4'>
          Certificate Creation & Verification
        </Typography>
      </Grid>
      <Grid item>
        <Create />
      </Grid>
      <Grid item>
        {values.certificate && (
          <Panel
            name='certificate'
            expanded={expanded}
            onChange={handleChange}
            details={values.certificate}
            outputRows={21}
          />
        )}
      </Grid>
      <Grid item>
        {values.certificate && (
          <Panel
            name='privateKey'
            expanded={expanded}
            onChange={handleChange}
            details={values.privateKey}
            outputRows={30}
          />
        )}
      </Grid>
      <Grid item>
        {values.publicKey && (
          <Panel
            name='publicKey'
            expanded={expanded}
            onChange={handleChange}
            details={values.publicKey}
            outputRows={10}
          />
        )}
      </Grid>
      <Grid item>
        {values.certificate && (
          <Verify />
        )}
      </Grid>
    </Grid>
  )
}
