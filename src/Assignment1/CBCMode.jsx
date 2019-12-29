import React, { useState } from 'react'
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import Actions from '../components/Actions'
import InputField from '../components/InputField'
import OutputField from '../components/OutputField'
import crypto from 'crypto'

const useStyles = makeStyles(theme => ({
  iv: {
    width: 420,
    marginRight: 64
  },
  message: {
    width: 420
  }
}))

export default function CBCMode () {
  const algorithm = 'aes-128-cbc'
  const classes = useStyles()
  const [input, setInput] = useState({
    iv: '00000000000000000000000000000000',
    key: crypto.randomBytes(16).toString('hex'),
    message: 'Assignment 1 Cipher-Block Chaining Mode:\ntest Message'
  })
  const [output, setOutput] = useState({
    state: 'decrypted',
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

  const handleChange = (name, value) => {
    setInput({ ...input, [name]: value })
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

  const handleCopy = (outputMessage) => {
    handleChange('message', outputMessage)
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
        <Typography variant='h4'>Cipher-Block Chaining Mode</Typography>
      </Grid>
      <Grid item>
        <TextField
          label='Initialization vector'
          variant='outlined'
          disabled
          value={input.iv}
          onChange={handleChange}
          className={classes.iv}
        />
      </Grid>
      <Grid item>
        <InputField name='key' input={input.key} onChange={handleChange} />
      </Grid>
      <Grid item>
        <InputField
          name='message'
          input={input.message}
          onChange={handleChange}
          multiline
          rows={5}
        />
      </Grid>
      <Grid item>
        <Actions
          onEncryption={encryptInput}
          onDecryption={decryptInput}
        />
      </Grid>
      <Grid item>
        <OutputField name={output.state} output={output.message} onCopy={handleCopy} rows={5} className={classes.message} />
      </Grid>
    </Grid>
  )
}
