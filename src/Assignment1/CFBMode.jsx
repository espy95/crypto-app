import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Fab
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import LockIcon from '@material-ui/icons/Lock'
import MessageIcon from '@material-ui/icons/Message'
import NoEncryptionIcon from '@material-ui/icons/NoEncryption'
import RefreshIcon from '@material-ui/icons/Refresh'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import Output from '../components/Output'
import { FileUpload, FileDownload } from '../components/FileTransfer'
import crypto from 'crypto'

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#808080',
    opacity: 0.5
  },
  card: {
    marginRight: 64
  },
  cardActions: {
    justifyContent: 'flex-end'
  },
  iv: {
    width: 420,
    marginRight: 64
  },
  key: {
    width: 420
  },
  message: {
    width: 420
  }
}))

export default function CFBMode () {
  const algorithm = 'aes-128-cfb'
  const classes = useStyles()
  const [input, setInput] = useState({
    iv: crypto.randomBytes(16).toString('hex'),
    keys: [crypto.randomBytes(16).toString('hex')],
    message: 'Assignment 1 Cipher Feedback Chaining Mode:\ntest Message'
  })
  const [output, setOutput] = useState({
    state: '',
    message: input.message
  })

  const encrypt = props => {
    const iv = Buffer.from(props.iv, 'hex')
    const key = Buffer.from(props.key, 'hex')
    const message = Buffer.from(props.message, 'utf8')
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(message)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
  }

  const decrypt = props => {
    const iv = Buffer.from(props.iv, 'hex')
    const key = Buffer.from(props.key, 'hex')
    const encryptedMessage = Buffer.from(props.message, 'hex')
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(encryptedMessage)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  }

  const handleInputChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }

  const handleIvChange = () => {
    setInput({
      ...input,
      iv: crypto.randomBytes(16).toString('hex')
    })
  }

  const handleAddKey = () => {
    setInput({
      ...input,
      keys: [...input.keys, [crypto.randomBytes(16).toString('hex')]]
    })
  }

  const handleKeyChange = () => {
    setInput({
      ...input,
      keys: input.keys.map(() => crypto.randomBytes(16).toString('hex'))
    })
  }

  const encryptInput = () => {
    setOutput({
      state: 'encrypted',
      message: encrypt(input)
    })
  }

  const decryptInput = () => {
    setOutput({
      state: 'decrypted',
      message: decrypt(input)
    })
  }

  const handleUpload = (fileInput, type) => {
    console.log('TCL: handleUpload -> fileInput', fileInput)
    setInput({
      ...input,
      [type]: fileInput
    })
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
        <Typography variant='h4'>Cipher Feedback Chaining Mode</Typography>
      </Grid>
      <Grid item>
        <TextField
          label='Initialization vector'
          variant='outlined'
          readOnly
          value={input.iv}
          onChange={handleInputChange}
          className={classes.iv}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button onClick={handleIvChange}>
                  <RefreshIcon className={classes.icon} />
                </Button>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item>
        <Card className={classes.card}>
          <CardHeader title='Keys' />
          <CardContent>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
              spacing={1}
            >
              {input.keys.map((key, i) => {
                return (
                  <Grid item key={i}>
                    <TextField
                      name='keys'
                      label={'Key ' + i}
                      variant='outlined'
                      value={key}
                      onChange={handleInputChange}
                      className={classes.key}
                      autoComplete='off'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <VpnKeyIcon className={classes.icon} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Fab onClick={handleAddKey}>
              <AddIcon />
            </Fab>
            <Fab onClick={handleKeyChange}>
              <RefreshIcon />
            </Fab>
            <FileUpload onUpload={file => handleUpload(file, 'key')} />
            <FileDownload fileOutput={{ state: 'keys', message: input.keys.join('\n') }} />
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Grid container justify='center' alignItems='center' spacing={1}>
          <Grid item>
            <TextField
              name='message'
              label='Message'
              variant='outlined'
              value={input.message}
              onChange={handleInputChange}
              className={classes.message}
              multiline
              rows={5}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MessageIcon className={classes.icon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <FileUpload onUpload={file => handleUpload(file, 'message')} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            startIcon={<LockIcon />}
            onClick={encryptInput}
          >
            Encrypt
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<NoEncryptionIcon />}
            onClick={decryptInput}
          >
            Decrypt
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {output.state !== '' ? (
          <Grid container justify='center' alignItems='center' spacing={1}>
            <Grid item>
              <Output props={output} />
            </Grid>
            <Grid item>
              <FileDownload fileOutput={output} />
            </Grid>
          </Grid>
        ) : (
          <Typography>Input Key & Message to Encrypt/Decrypt</Typography>
        )}
      </Grid>
    </Grid>
  )
}
