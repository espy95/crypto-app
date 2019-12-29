export const createCert = (cert) => {
  return {
    type: 'CREATE_CERT',
    payload: cert
  }
}
