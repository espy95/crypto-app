import React from 'react'
import { Fab, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import crypto from 'crypto'

const algorithm = 'aes-128-cfb'
const iv = crypto.randomBytes(16)
const key = crypto.randomBytes(16)

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none'
  },
  fileUpload: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5)
  }
}))

export default function FileEncryption () {
  const classes = useStyles()

  const handleFiles = () => {
    const file = document.querySelector('input[type=file]').files[0]
    console.log('TCL: handleFiles -> file', file)
    const reader = new FileReader()
    reader.onload = function (event) {
      const contents = event.target.result
      console.log('TCL: reader.onload -> contents', contents)
    }
    reader.readAsText(file)
  }

  return (
    <Fab className={classes.fileUpload} component='label'>
      <Input type='file' className={classes.hidden} onChange={handleFiles} />
      <AttachFileIcon />
    </Fab>
  )
}

// read.pipe(zip).pipe(encrypt).pipe(decrypt).pipe(unzip).pipe(write)
