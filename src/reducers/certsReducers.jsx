import { pki } from 'node-forge'

const caStore = pki.createCaStore()

const certsReducers = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_CERTIFICATE':
      caStore.addCertificate(action.payload)
      return caStore.listAllCertificates.apply()
    default:
      return state
  }
}

export default certsReducers

export const getCerts = state => state
