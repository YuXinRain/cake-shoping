import { createSlice } from '@reduxjs/toolkit'
import { getLogin, getMe, getRegister } from '../../WebAPI'
import { setAuthToken } from '../../token'

const initialState = {
    user: '',
    isLodding: false,
    err: ''
    }

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
        state.err = action.payload
    },
    setUser: (state, action) => {
        state.user = action.payload
    },
    setLodding: (state, action) => {
        state.isLodding = action.payload
    },
  },
})

export const { setError, setUser, setLodding } = userReducer.actions

export const getUser = (data) => (dispatch) => {
    dispatch(setLodding(true))
    getLogin(data).then(res => {
        setAuthToken(res.token)
        if(res.ok === 0){
            dispatch(setError(res.message))
            dispatch(setLodding(false))
        }
        getMe().then(data => {
            if(data.ok === 1){
                dispatch(setUser(data.result))
                dispatch(setLodding(false))
            }
        }).catch(err => console.log(err))
   }   
    )
    .catch(err => console.log(err))
}

export const postRegister = (data) => (dispatch) => {
    dispatch(setLodding(true))
    getRegister(data).then(res => {
        setAuthToken(res.token)
        if(res.ok === 0){
            dispatch(setError(res.message))
            dispatch(setLodding(false))
        }
        getMe().then(data => {
            if(data.ok === 1){
                dispatch(setUser(data.result))
                dispatch(setLodding(false))
            }
        }).catch(err => console.log(err))
})
    .catch(err=> console.log(err))
}
export default userReducer.reducer