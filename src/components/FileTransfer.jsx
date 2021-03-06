import React from 'react'
import { Fab, Input, makeStyles } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import GetAppIcon from '@material-ui/icons/GetApp'
import { useSnackbar } from 'notistack'
import FileSaver from 'file-saver'
import forge from 'node-forge'

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none'
  }
}))

const snackbarVariants = {
  success: {
    variant: 'success',
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
  },
  error: {
    variant: 'error',
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
  }
}

export function FileUpload ({ onUpload, showIcon, showText, ...props }) {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const handleFile = (event) => {
    if (event !== undefined) {
      const file = event.target.files[0]
      if (file !== undefined && file !== null && file.size > 0) {
        const reader = new window.FileReader()
        reader.readAsText(file)
        reader.onload = (event) => {
          if (file.name.includes('encrypted')) {
            onUpload(forge.util.bytesToHex(event.target.result))
          } else {
            onUpload(event.target.result)
          }
        }
        enqueueSnackbar(`File "${file.name}" uploaded successfully`, snackbarVariants.success)
      } else {
        enqueueSnackbar('File upload failed', snackbarVariants.error)
      }
    }
  }

  return (
    <Fab component='label' {...props}>
      <Input type='file' className={classes.hidden} onChange={handleFile} />
      {showIcon || <AttachFileIcon />}
      {showText}
    </Fab>
  )
}

export function FileDownload ({ file }) {
  const { enqueueSnackbar } = useSnackbar()
  const { state, message } = file

  const handleFile = (event) => {
    try {
      if (state === 'encrypted') {
        const fileType = 'octet/stream'
        const encryptedMessage = forge.util.hexToBytes(message)
        const blob = new window.Blob([encryptedMessage], { type: fileType })
        FileSaver.saveAs(blob, state)
        enqueueSnackbar(`File "${state}" downloaded successfully`, snackbarVariants.success)
      } else {
        const fileType = 'text/plain;charset=utf8'
        const blob = new window.Blob([message], { type: fileType })
        FileSaver.saveAs(blob, state)
        enqueueSnackbar(`File "${state}.txt" downloaded successfully`, snackbarVariants.success)
      }
    } catch (error) {
      enqueueSnackbar('File download failed', snackbarVariants.error)
    }
  }

  return (
    <Fab onClick={handleFile}>
      <GetAppIcon />
    </Fab>
  )
}
