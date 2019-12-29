import React, { useState } from 'react'
import {
  CircularProgress,
  Fab,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import OutputField from '../components/OutputField'
import delay from 'lodash/delay'
import forge, { pki } from 'node-forge'

const useStyles = makeStyles(theme => ({
  longMessage: {
    width: 850
  }
}))

export default function Certification () {
  const classes = useStyles()
  const [pem, setPem] = useState({})
  const [loading, setLoading] = useState(false)
  const caStore = pki.createCaStore()

  const createCertificate = () => {
    setLoading(true)
    delay(() => {
      const keys = pki.rsa.generateKeyPair(2048)
      const cert = pki.createCertificate()
      cert.publicKey = keys.publicKey
      cert.serialNumber = '01'
      cert.validity.notBefore = new Date()
      cert.validity.notAfter = new Date()
      cert.validity.notAfter.setFullYear(
        cert.validity.notBefore.getFullYear() + 1
      )
      const attrs = [
        {
          name: 'commonName',
          value: 'localhost'
        },
        {
          name: 'organizationName',
          value: 'Olafs Eglajs'
        }
      ]
      cert.setSubject(attrs)
      cert.setIssuer(attrs)
      cert.sign(keys.privateKey, forge.md.sha256.create())
      setPem({
        privateKey: pki.privateKeyToPem(keys.privateKey),
        publicKey: pki.publicKeyToPem(cert.publicKey),
        certificate: pki.certificateToPem(cert)
      })
      caStore.addCertificate(cert)
      const caStoreCerts = caStore.listAllCertificates.apply()
      console.log('caStoreCerts ->', caStoreCerts)
      console.log('pki.certificateToPem(caStoreCerts[0]) ->', pki.certificateToPem(caStoreCerts[0]))
      setLoading(false)
    }, 1000)
  }

  const handleCopy = name => {
    const copyText = document.getElementById(name)
    copyText.select()
    document.execCommand('copy')
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
        {loading ? (
          <CircularProgress color='inherit' />
        ) : !pem.certificate && (
          <Fab variant='extended' onClick={createCertificate}>
            <NoteAddIcon />
            Create
          </Fab>
        )}
      </Grid>
      <Grid item>
        {pem.certificate && (
          <OutputField
            name='certificate'
            output={pem.certificate}
            onCopy={() => handleCopy('certificateOutput')}
            className={classes.longMessage}
            rows={19}
          />
        )}
      </Grid>
      <Grid item>
        {pem.privateKey && (
          <OutputField
            name='privateKey'
            output={pem.privateKey}
            onCopy={() => handleCopy('privateKeyOutput')}
            className={classes.longMessage}
            rows={28}
          />
        )}
      </Grid>
      <Grid item>
        {pem.publicKey && (
          <OutputField
            name='publicKey'
            output={pem.publicKey}
            onCopy={() => handleCopy('publicKeyOutput')}
            className={classes.longMessage}
            rows={10}
          />
        )}
      </Grid>
    </Grid>
  )
}
