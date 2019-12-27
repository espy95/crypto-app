import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  TextField
} from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import RefreshIcon from '@material-ui/icons/Refresh'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { FileUpload } from './FileTransfer'
import crypto from 'crypto'

const useStyles = makeStyles(theme => ({
  textField: {
    width: 420
  },
  icon: {
    color: '#808080',
    opacity: 0.5
  }
}))

export default function InputField ({ name, input, onChange, ...props }) {
  const classes = useStyles()
  const [value, setValue] = useState(input)

  useEffect(() => {
    setValue(input)
  }, [input])

  const handleRefresh = () => {
    const randomKey = crypto.randomBytes(16).toString('hex')
    setValue(randomKey)
    onChange(name, randomKey)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
    onChange(name, event.target.value)
  }

  const handleUpload = file => {
    setValue(file)
    onChange(name, file)
  }

  return (
    <Grid container justify='center' alignItems='center' spacing={1}>
      <Grid item>
        <TextField
          {...props}
          name={name}
          label={name.toUpperCase()}
          value={value}
          variant='outlined'
          onChange={handleChange}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {name === 'key' || name === 'mac' ? (
                  <VpnKeyIcon className={classes.icon} />
                ) : name === 'message' && (
                  <MessageIcon className={classes.icon} />
                )}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                {name !== 'message' && name !== 'mac' && (
                  <Button onClick={handleRefresh}>
                    <RefreshIcon className={classes.icon} />
                  </Button>
                )}
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item>
        <FileUpload onUpload={handleUpload} />
      </Grid>
    </Grid>
  )
}
