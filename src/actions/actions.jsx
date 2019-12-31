export const create = () => {
  return {
    type: 'CREATE_CERT'
  }
}

export const upload = cert => {
  return {
    type: 'UPLOAD_CERT',
    payload: cert
  }
}

export const uploadKey = key => {
  return {
    type: 'UPLOAD_KEY',
    payload: key
  }
}
