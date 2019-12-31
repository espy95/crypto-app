import React from 'react'
import { useDispatch } from 'react-redux'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
  Typography
} from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description'
import LockIcon from '@material-ui/icons/Lock'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import OutputField from '../../components/OutputField'
import { FileUpload } from '../../components/FileTransfer'
import { uploadKey } from '../../actions/actions'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  longMessage: {
    width: 850
  }
}))

const expandIcons = {
  certificate: <DescriptionIcon />,
  publicKey: <NoEncryptionIcon color='secondary' />,
  privateKey: <LockIcon color='primary' />,
  key: <VpnKeyIcon />
}

export default function Panel ({
  name,
  expanded,
  onChange,
  details,
  outputRows,
  ...props
}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleExpansion = () => {
    onChange(name)
  }

  const handleChange = key => {
    dispatch(uploadKey(key))
  }

  const handleCopy = name => {
    const copyText = document.getElementById(name)
    copyText.select()
    document.execCommand('copy')
  }

  return (
    <ExpansionPanel expanded={expanded === name} onChange={handleExpansion}>
      <ExpansionPanelSummary expandIcon={details && expandIcons[name]}>
        <Typography className={classes.heading}>{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <OutputField
          name={name}
          output={details}
          onCopy={() => handleCopy(name + 'Output')}
          className={classes.longMessage}
          rows={outputRows}
        />
        <FileUpload onUpload={handleChange} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
