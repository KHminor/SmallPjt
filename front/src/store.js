import { configureStore, createSlice } from '@reduxjs/toolkit'

let token = createSlice({
  name: 'token',
  initialState: {token: ''},
  reducers: {
    changeToken(state,action) {
      state.token = action.payload
    }
  }
})

export let {changeToken} = token.actions


export default configureStore({
  reducer: { 
    token: token.reducer
  }
})