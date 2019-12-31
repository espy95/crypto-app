import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import delay from 'lodash/delay'
import { CircularProgress, Fab, Grid } from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import { create, upload } from '../../actions/actions'
import { FileUpload } from '../../components/FileTransfer'

export default function Create () {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const createCertificate = () => {
    setLoading(true)
    delay(() => {
      dispatch(create())
      setLoading(false)
    }, 500)
  }

  const uploadCertificate = cert => {
    dispatch(upload(cert))
  }

  return (
    <>
      {loading ? (
        <CircularProgress color='inherit' />
      ) : (
        <Grid container direction='row' spacing={1}>
          <Grid item>
            <Fab variant='extended' onClick={createCertificate}>
              <NoteAddIcon />
          Create
            </Fab>
          </Grid>
          <Grid item>
            <FileUpload
              variant='extended'
              showText='Import'
              onUpload={uploadCertificate}
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}
