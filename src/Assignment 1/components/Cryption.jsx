import forge from 'node-forge'

const blockSize = 16
const zero = '00000000000000000000000000000000'
const Rb = Buffer.from('00000000000000000000000000000087', 'hex')

export const encrypt = ({ ...props }) => {
  const iv = forge.util.createBuffer(props.iv, 'hex')
  const key = forge.util.createBuffer(props.key, 'hex')
  const message = forge.util.createBuffer(props.message, 'utf8')
  const cipher = forge.cipher.createCipher(props.algorithm, key)
  cipher.start({ iv: iv })
  while (message.length() > blockSize) {
    const inBlock = forge.util.createBuffer(message.getBytes(blockSize))
    cipher.update(inBlock)
  }
  // Final block
  const inBlock = forge.util.createBuffer(message.getBytes(blockSize))
  const pad = blockSize - inBlock.length()
  while (inBlock.length() < blockSize) inBlock.putByte(pad)
  cipher.update(inBlock)
  return cipher.output.toHex()
}

export const decrypt = ({ ...props }) => {
  const iv = forge.util.createBuffer(props.iv, 'hex')
  const key = forge.util.createBuffer(props.key, 'hex')
  const encryptedMessage = forge.util.createBuffer(forge.util.hexToBytes(props.message), 'hex')
  const decipher = forge.cipher.createDecipher(props.algorithm, key)
  decipher.start({ iv: iv })
  decipher.update(encryptedMessage)
  // Remove padding from final block
  const outBlock = Buffer.from(decipher.output.toHex(), 'hex')
  const pad = outBlock[outBlock.length - 1] < 16 ? outBlock.length - outBlock[outBlock.length - 1] : outBlock.length
  const output = outBlock.slice(0, pad)
  return Buffer.from(output).toString('utf8')
}

export const cmac = ({ ...props }) => {
  const subkeys = generateSubkeys(props)
  let blockCount = Math.ceil(props.message.length / blockSize)
  let lastBlockCompleteFlag, lastBlock

  if (blockCount === 0) {
    blockCount = 1
    lastBlockCompleteFlag = false
  } else {
    lastBlockCompleteFlag = (props.message.length % blockSize === 0)
  }
  const lastBlockIndex = blockCount - 1

  if (lastBlockCompleteFlag) {
    lastBlock = xor(getMessageBlock(props.message, lastBlockIndex), subkeys.subkey1)
  } else {
    lastBlock = xor(getPaddedMessageBlock(props.message, lastBlockIndex), subkeys.subkey2)
  }

  let x = Buffer.from(zero, 'hex')
  let y

  for (let index = 0; index < lastBlockIndex; index++) {
    y = xor(x, getMessageBlock(props.message, index))
    x = encrypt({ ...props, message: y })
  }
  y = xor(lastBlock, x)
  return encrypt({ ...props, message: y })
}

const bitShiftLeft = buffer => {
  const shifted = new Buffer(buffer.length)
  const last = buffer.length - 1
  for (let index = 0; index < last; index++) {
    shifted[index] = buffer[index] << 1
    if (buffer[index + 1] & 0x80) {
      shifted[index] += 0x01
    }
  }
  shifted[last] = buffer[last] << 1
  return shifted
}

const xor = (bufferA, bufferB) => {
  const length = Math.min(bufferA.length, bufferB.length)
  const output = new Buffer(length)
  for (let index = 0; index < length; index++) {
    output[index] = bufferA[index] ^ bufferB[index]
  }
  return output
}

const generateSubkeys = ({ ...props }) => {
  const l = encrypt({ ...props, message: zero })

  let subkey1 = bitShiftLeft(l)
  if (l[0] & 0x80) {
    subkey1 = xor(subkey1, Rb)
  }

  let subkey2 = bitShiftLeft(subkey1)
  if (subkey1[0] & 0x80) {
    subkey2 = xor(subkey2, Rb)
  }

  return { subkey1: subkey1, subkey2: subkey2 }
}

function getMessageBlock (message, blockIndex) {
  const block = new Buffer(blockSize)
  const start = blockIndex * blockSize
  const end = start + blockSize
  block.set(Buffer.from(message.slice(start, end)))
  return block
}

function getPaddedMessageBlock (message, blockIndex) {
  const block = new Buffer(blockSize)
  const start = blockIndex * blockSize
  const end = message.length
  block.set(Buffer.from(message.slice(start, end)))
  block[end - start] = 0x80
  return block
}
