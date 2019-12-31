import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { getCertPems } from '../../reducers/reducers'
import Actions from '../../components/Actions'
import InputField from '../../components/InputField'
import OutputField from '../../components/OutputField'
import Create from './Create'
import Panel from './Panel'
import forge from 'node-forge'

const useStyles = makeStyles(theme => ({
  message: {
    width: 420
  }
}))

export default function Cryption () {
  const classes = useStyles()
  const pems = useSelector(getCertPems)
  const [input, setInput] = useState({
    key: pems.privateKey || pems.publicKey,
    message: 'Assignment 2: Cryption with Certificate public key:\ntest Message'
  })

  useEffect(() => {
    setInput({
      ...input,
      key: pems.privateKey || pems.publicKey
    })
  }, [pems])

  const [expanded, setExpanded] = useState('')
  const handleExpansion = panel => {
    setExpanded(expanded === panel ? '' : panel)
  }

  const [output, setOutput] = useState({
    state: 'decrypted',
    message: input.message
  })

  const handleChange = (name, value) => {
    setInput({
      ...input,
      [name]: value
    })
  }

  function getKeyFromPem (pem) {
    console.log('​getKeyFromPem -> pem', pem)
    return pem.includes('PRIVATE KEY') ? forge.pki.privateKeyFromPem(pem) : forge.pki.publicKeyFromPem(pem)
  }

  const encrypt = props => {
    const iv = forge.random.getBytesSync(16)
    const key = getKeyFromPem(input.key)
    const message = Buffer.from(props.message, 'utf8')
    const cipher = forge.cipher.createCipher('AES-CBC', key)
    cipher.start({ iv: iv })
    cipher.update(forge.util.createBuffer(message))
    cipher.finish()
    return cipher.output.toHex()
  }

  const decrypt = props => {
    const iv = Buffer.from(props.iv, 'hex')
    const key = Buffer.from(props.key, 'hex')
    const encryptedMessage = Buffer.from(props.message, 'hex')
    const decipher = forge.cipher.createDecipher('AES-CBC', key)
    decipher.start({ iv: iv })
    decipher.update(forge.util.createBuffer(encryptedMessage))
    decipher.finish()
    return decipher.output.toString()
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
        <Typography variant='h4'>Encrypt & Decrypt</Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          justify='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item>
            <Typography variant='subtitle1'>From Certificate: </Typography>
          </Grid>
          <Grid>
            <Create />
          </Grid>
        </Grid>
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
        <Panel
          name='key'
          expanded={expanded}
          onChange={handleExpansion}
          details={input.key}
          outputRows={30}
        />
      </Grid>
      <Grid item>
        {input.key && input.message && <Actions onEncryption={encryptInput} onDecryption={decryptInput} />}
      </Grid>
      <Grid item>
        <OutputField name={output.state} output={output.message} onCopy={handleCopy} rows={5} className={classes.message} />
      </Grid>
    </Grid>
  )
}
