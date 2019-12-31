import { createSelector } from 'reselect'
import forge, { pki } from 'node-forge'

const attrs = [
  {
    name: 'commonName',
    value: 'localhost'
  },
  {
    name: 'organizationName',
    value: 'Olafs Eglajs'
  }
]

const certReducers = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_CERT': {
      const keys = pki.rsa.generateKeyPair(2048)
      const cert = pki.createCertificate()
      cert.publicKey = keys.publicKey
      cert.serialNumber = '01'
      cert.validity.notBefore = new Date()
      cert.validity.notAfter = new Date()
      cert.validity.notAfter.setFullYear(
        cert.validity.notBefore.getFullYear() + 1
      )
      cert.setSubject(attrs)
      cert.setIssuer(attrs)
      cert.setExtensions([{
        name: 'basicConstraints',
        cA: true
      }, {
        name: 'keyUsage',
        keyCertSign: true,
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
        dataEncipherment: true
      }, {
        name: 'extKeyUsage',
        serverAuth: true,
        clientAuth: true,
        codeSigning: true,
        emailProtection: true,
        timeStamping: true
      }, {
        name: 'nsCertType',
        client: true,
        server: true,
        email: true,
        objsign: true,
        sslCA: true,
        emailCA: true,
        objCA: true
      }])
      cert.sign(keys.privateKey, forge.md.sha256.create())
      return {
        certificate: cert,
        privateKey: keys.privateKey
      }
    }
    case 'UPLOAD_CERT': {
      return {
        certificate: pki.certificateFromPem(action.payload)
      }
    }
    case 'UPLOAD_KEY': {
      return {
        ...state,
        privateKey: pki.privateKeyFromPem(action.payload)
      }
    }
    default: {
      return state
    }
  }
}

export default certReducers

export const getCaStore = state => state.caStore || {}

export const getCertPems = createSelector([getCaStore], caStore => {
  const { certificate, privateKey } = caStore
  const pems = {
    certificate: certificate && pki.certificateToPem(certificate),
    publicKey: certificate && pki.publicKeyToPem(certificate.publicKey),
    privateKey: privateKey && pki.privateKeyToPem(privateKey)
  }
  return pems
})

export const getCert = state => state.caStore.certificate || {}
