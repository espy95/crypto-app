import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Fab, makeStyles, Typography } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { getCert } from '../../reducers/reducers'

const useStyles = makeStyles(theme => ({
  verify: {
    color: theme.palette.common.black
  },
  verified: {
    color: '#4caf50'
  },
  refuted: {
    color: theme.palette.error.main
  }
}))

export default function Verify () {
  const cert = useSelector(getCert)
  const classes = useStyles()
  const [status, setStatus] = useState('verify')
  useEffect(() => {
    setStatus('verify')
  }, [cert])

  const isEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  const verifyCertificate = () => {
    if (!isEqual(cert.subject, cert.issuer)) {
      setStatus('refuted')
      return
    }
    try {
      cert.verify(cert)
      setStatus('verified')
    } catch (error) {
      setStatus('refuted')
    }
  }

  return (
    <Fab variant='extended' className={classes[status]} onClick={verifyCertificate} disabled={status !== 'verify'}>
      <VerifiedUserIcon className={classes[status]} />
      <Typography variant='h6' className={classes[status]}>{status}</Typography>
    </Fab>
  )
}
