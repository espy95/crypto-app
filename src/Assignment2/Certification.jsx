import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import delay from 'lodash/delay'
import {
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description'
import LockIcon from '@material-ui/icons/Lock'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import OutputField from '../components/OutputField'
import { getCertPem } from '../reducers/certReducers'
import { createCert } from '../actions/actions'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  longMessage: {
    width: 850
  },
  icons: {
    opacity: 0.5
  }
}))

export default function Certification () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const pem = useSelector(getCertPem)

  const createCertificate = () => {
    setLoading(true)
    delay(() => {
      dispatch(createCert())
      setLoading(false)
    }, 500)
  }

  const handleCopy = name => {
    const copyText = document.getElementById(name)
    copyText.select()
    document.execCommand('copy')
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
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
        ) : (
          <Fab variant='extended' onClick={createCertificate}>
            <NoteAddIcon />
            Create
          </Fab>
        )}
      </Grid>
      <Grid item>
        {pem.certificate && (
          <ExpansionPanel
            expanded={expanded === 'certificate'}
            onChange={handleChange('certificate')}
          >
            <ExpansionPanelSummary
              expandIcon={<DescriptionIcon className={classes.icons} />}
            >
              <Typography className={classes.heading}>Certificate</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <OutputField
                name='certificate'
                output={pem.certificate}
                onCopy={() => handleCopy('certificateOutput')}
                className={classes.longMessage}
                rows={19}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </Grid>
      <Grid item>
        {pem.privateKey && (
          <ExpansionPanel
            expanded={expanded === 'privateKey'}
            onChange={handleChange('privateKey')}
          >
            <ExpansionPanelSummary
              expandIcon={<LockIcon className={classes.icons} color='primary' />}
            >
              <Typography variant='subtitle1' className={classes.heading}>
                Private Key
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <OutputField
                name='privateKey'
                output={pem.privateKey}
                onCopy={() => handleCopy('privateKeyOutput')}
                className={classes.longMessage}
                rows={28}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </Grid>
      <Grid item>
        {pem.certificate && (
          <ExpansionPanel
            expanded={expanded === 'publicKey'}
            onChange={handleChange('publicKey')}
          >
            <ExpansionPanelSummary
              expandIcon={<NoEncryptionIcon className={classes.icons} color='secondary' />}
            >
              <Typography className={classes.heading}>Public Key</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <OutputField
                name='publicKey'
                output={pem.publicKey}
                onCopy={() => handleCopy('publicKeyOutput')}
                className={classes.longMessage}
                rows={10}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </Grid>
    </Grid>
  )
}
