import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Actions from '../components/Actions'
import InputField from '../components/InputField'
import OutputField from '../components/OutputField'
import crypto from 'crypto'
// import aesCmac from 'node-aes-cmac'
var aesCmac = require('node-aes-cmac').aesCmac

const initialInput = {
  iv: crypto.randomBytes(16).toString('hex'),
  key: crypto.randomBytes(16).toString('hex'),
  message: 'Assignment 1 Cipher Feedback Chaining Mode:\ntest Message'
}

export default function CFBMode () {
  const algorithm = 'aes-128-cfb'

  const [input, setInput] = useState({
    ...initialInput,
    mac: aesCmac(
      initialInput.key,
      initialInput.message
    ).toString('hex')
  })
  console.log('CFB input', input)
  const [output, setOutput] = useState({
    state: '',
    message: input.message
  })

  const encrypt = props => {
    const iv = Buffer.from(props.iv, 'hex')
    const key = Buffer.from(props.key, 'hex')
    const cmac = Buffer.from(props.mac, 'hex')
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
    setInput({
      ...input,
      [name]: value,
      mac: aesCmac(
        name === 'key' ? value : input.key,
        name === 'message' ? value : input.message
      )
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
        <InputField name='iv' input={input.iv} onChange={handleChange} disabled />
      </Grid>
      <Grid item>
        <InputField name='mac' input={input.mac} onChange={handleChange} disabled />
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
        <Actions onEncryption={encryptInput} onDecryption={decryptInput} />
      </Grid>
      <Grid item>
        <OutputField output={output} onCopy={handleChange} />
      </Grid>
    </Grid>
  )
}
