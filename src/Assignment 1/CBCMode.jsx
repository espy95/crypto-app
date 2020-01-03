import React, { useState } from 'react'
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import Actions from '../components/Actions'
import InputField from '../components/InputField'
import OutputField from '../components/OutputField'
import forge from 'node-forge'

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
  const algorithm = 'AES-CBC'
  const classes = useStyles()
  const [input, setInput] = useState({
    iv: '00000000000000000000000000000000',
    key: forge.util.bytesToHex(forge.random.getBytesSync(16)),
    message: 'Assignment 1 Cipher-Block Chaining Mode:\ntest Message'
  })
  const [output, setOutput] = useState({
    state: 'decrypted',
    message: input.message
  })

  const encrypt = props => {
    const iv = forge.util.createBuffer(props.iv, 'hex')
    const key = forge.util.createBuffer(props.key, 'hex')
    const message = forge.util.createBuffer(props.message, 'utf8')
    const cipher = forge.cipher.createCipher(algorithm, key)
    cipher.start({ iv: iv })
    while (message.length() > cipher.blockSize) {
      const inBlock = forge.util.createBuffer(message.getBytes(cipher.blockSize))
      cipher.update(inBlock)
    }
    // Final block
    const inBlock = forge.util.createBuffer(message.getBytes(cipher.blockSize))
    while (inBlock.length() < cipher.blockSize) inBlock.putByte(0)
    cipher.update(inBlock)
    return cipher.output.toHex()
  }

  const decrypt = props => {
    const iv = forge.util.createBuffer(props.iv, 'hex')
    const key = forge.util.createBuffer(props.key, 'hex')
    const encryptedMessage = forge.util.createBuffer(forge.util.hexToBytes(props.message))
    const decipher = forge.cipher.createDecipher(algorithm, key)
    decipher.start({ iv: iv })
    decipher.update(encryptedMessage)
    // Remove padding from final block
    const outBlock = Buffer.from(decipher.output.toHex(), 'hex')
    const paddingIndex = outBlock.findIndex((i) => i === 0)
    return outBlock.slice(0, paddingIndex)
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
        <Typography variant='h4'>Cipher-Block Chaining Mode ({algorithm})</Typography>
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
