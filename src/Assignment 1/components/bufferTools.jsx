export const bitShiftLeft = buffer => {
  const shifted = Buffer.from(buffer.length)
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

export const xor = (bufferA, bufferB) => {
  const length = Math.min(bufferA.length, bufferB.length)
  const output = Buffer.from(length)
  for (let index = 0; index < length; index++) {
    output[index] = bufferA[index] ^ bufferB[index]
  }
  return output
}
