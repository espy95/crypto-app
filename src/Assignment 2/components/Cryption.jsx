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
    width: 600
  }
}))

export default function Cryption () {
  const classes = useStyles()
  const pems = useSelector(getCertPems)
  const [input, setInput] = useState({
    key: pems.publicKey,
    message: 'Assignment 2: Cryption with Certificate public key:\ntest Message'
  })

  useEffect(() => {
    setInput({
      ...input,
      publicKey: pems.publicKey,
      privateKey: pems.privateKey
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

  const encrypt = props => {
    const key = forge.pki.publicKeyFromPem(props.publicKey)
    const message = Buffer.from(props.message, 'utf8')
    const encrypted = key.encrypt(message, 'RSAES-PKCS1-V1_5')
    return forge.util.bytesToHex(encrypted)
  }

  const decrypt = props => {
    const key = forge.pki.privateKeyFromPem(props.privateKey)
    const encryptedMessage = Buffer.from(props.message, 'hex')
    const decrypted = key.decrypt(encryptedMessage, 'RSAES-PKCS1-V1_5')
    return decrypted
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
          name='publicKey'
          expanded={expanded}
          onChange={handleExpansion}
          details={input.publicKey}
          outputRows={10}
        />
      </Grid>
      <Grid item>
        <Panel
          name='privateKey'
          expanded={expanded}
          onChange={handleExpansion}
          details={input.privateKey}
          outputRows={30}
        />
      </Grid>
      {input.publicKey && input.privateKey && input.message && (
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item>
            <Actions onEncryption={encryptInput} onDecryption={decryptInput} />
          </Grid>
          <Grid item>
            <OutputField name={output.state} output={output.message} onCopy={handleCopy} rows={10} className={classes.message} />
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
