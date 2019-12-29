const keysReducers = (state = {}, action) => {
  switch (action.type) {
    case 'ENCRYPT':
      return action.payload
    default:
      return state
  }
}

export default keysReducers
