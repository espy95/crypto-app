import React, { useState } from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import Actions from '../../components/Actions'
import InputField from '../../components/InputField'
import OutputField from '../../components/OutputField'
import forge from 'node-forge'
import { encrypt, decrypt, cmac } from './Cryption'

const useStyles = makeStyles(theme => ({
  message: {
    width: 600
  }
}))

export default function CFBMode () {
  const classes = useStyles()
  const [input, setInput] = useState({
    algorithm: 'AES-CFB',
    iv: forge.util.bytesToHex(forge.random.getBytesSync(16)),
    key: forge.util.bytesToHex(forge.random.getBytesSync(16)),
    macKey: forge.util.bytesToHex(forge.random.getBytesSync(16)),
    message: 'Assignment 1 Cipher Feedback Chaining Mode:\ntest Message'
  })

  const [output, setOutput] = useState({
    state: 'decrypted',
    message: input.message,
    mac: input.macKey
  })

  const handleChange = (name, value) => {
    setInput({
      ...input,
      [name]: value
    })
  }

  const encryptInput = () => {
    setOutput({
      state: 'encrypted',
      message: encrypt(input),
      mac: cmac(input)
    })
  }

  const decryptInput = () => {
    setOutput({
      state: 'decrypted',
      message: decrypt(input),
      mac: cmac(input)
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
        <Typography variant='h4'>Cipher Feedback Chaining Mode ({input.algorithm})</Typography>
      </Grid>
      <Grid item>
        <InputField name='iv' input={input.iv} onChange={handleChange} />
      </Grid>
      <Grid item>
        <InputField name='key' input={input.key} onChange={handleChange} />
      </Grid>
      <Grid item>
        <InputField name='macKey' input={input.macKey} onChange={handleChange} />
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
        <Actions onEncryption={encryptInput} onDecryption={decryptInput} />
      </Grid>
      <Grid item>
        <OutputField name={output.state} output={output.message} onCopy={handleCopy} rows={10} className={classes.message} />
      </Grid>
      <Grid item>
        <OutputField name='mac' output={output.mac} className={classes.message} />
      </Grid>
    </Grid>
  )
}
