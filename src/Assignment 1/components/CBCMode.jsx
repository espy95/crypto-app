import React, { useState } from 'react'
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import Actions from '../../components/Actions'
import InputField from '../../components/InputField'
import OutputField from '../../components/OutputField'
import forge from 'node-forge'
import { encrypt, decrypt } from './Cryption'

const useStyles = makeStyles(theme => ({
  iv: {
    width: 600,
    marginRight: 64
  },
  message: {
    width: 600
  }
}))

export default function CBCMode () {
  const classes = useStyles()
  const [input, setInput] = useState({
    algorithm: 'AES-CBC',
    iv: '00000000000000000000000000000000',
    key: forge.util.bytesToHex(forge.random.getBytesSync(16)),
    message: 'Assignment 1 Cipher-Block Chaining Mode:\ntest Message'
  })
  const [output, setOutput] = useState({
    state: 'decrypted',
    message: input.message
  })

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
        <Typography variant='h4'>Cipher-Block Chaining Mode ({input.algorithm})</Typography>
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
          rows={7}
        />
      </Grid>
      <Grid item>
        <Actions
          onEncryption={encryptInput}
          onDecryption={decryptInput}
        />
      </Grid>
      <Grid item>
        <OutputField name={output.state} output={output.message} onCopy={handleCopy} rows={7} className={classes.message} />
      </Grid>
    </Grid>
  )
}
