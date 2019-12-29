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

const keys = pki.rsa.generateKeyPair(2048)
const cert = pki.createCertificate()

const certReducers = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_CERT':
      cert.publicKey = keys.publicKey
      cert.serialNumber = '01'
      cert.validity.notBefore = new Date()
      cert.validity.notAfter = new Date()
      cert.validity.notAfter.setFullYear(
        cert.validity.notBefore.getFullYear() + 1
      )
      cert.setSubject(attrs)
      cert.setIssuer(attrs)
      cert.sign(keys.privateKey, forge.md.sha256.create())
      return [
        cert
      ]
    default:
      return state
  }
}

export default certReducers

export const getCert = (state) => state.cert

export const getCertPem = createSelector(
  [getCert],
  (cert) => {
    return (cert.length > 0) ? {
      certificate: pki.certificateToPem(cert[0]),
      privateKey: pki.privateKeyToPem(keys.privateKey),
      publicKey: pki.publicKeyToPem(cert[0].publicKey)
    } : {}
  }
)
